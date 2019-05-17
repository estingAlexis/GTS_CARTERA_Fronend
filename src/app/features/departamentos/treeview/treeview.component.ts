import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { DepartamentosService } from '../departamentos.service';
import { DepartamentoClass } from '../departamento.class'

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {
listadoDepartamentos:DepartamentoClass[]
stateFilter:number;
@Output() form = new EventEmitter();
@Input() set cambio(cambio: number) {
    if (cambio > 1) {
        this.listar_datos();
    }
}
@Input() set state(state: number) {
    this.stateFilter = state;
    this.listar_datos()
}
public expandedKeys: any[] = ['0', '1'];
public data: any[] = [];
public hasChildren = (item: any) => item.items && item.items.length > 0;
public fetchChildren = (item: any) => of(item.items);


constructor(
    private departamentosService:DepartamentosService
) { }

ngOnInit() {
}

/* custom selection implementation below */

public selectedKeys: any[] = ['0_1'];

public isItemSelected = (_: any, index: string) => this.selectedKeys.indexOf(index) > -1;

public handleSelection(event): void {
    this.selectedKeys = [event.index];
    this.form.emit({tipo:2, id: event.dataItem.id})
}

async listar_datos() {
    this.data = []
    this.listadoDepartamentos = await this.departamentosService.listar_departamentos_filtrados({estado: this.stateFilter}).then(result => result);
    this.listadoDepartamentos.forEach(element => {
        this.data.push({
            text: element.nombre,
            id: element.id,
            estado: element.estado,
            items:[{text:'+ Agregar nueva ciudad'}]  
        })
    });
}


}
