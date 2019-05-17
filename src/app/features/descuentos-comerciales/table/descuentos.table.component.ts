import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DescuentoClass } from '../descuentos-comerciales.class';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
import { SnotifyService } from 'ng-snotify';
import { DescuentoService } from '../descuentos.service'

@Component({
  selector: 'app-descuento-table',
  templateUrl: './descuentos.table.component.html',
  styleUrls: ['./descuentos.table.component.css']
})
export class DescuentosTableComponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    stateFilter: number;
    listadoDescuentos:DescuentoClass[]

    @Input() set state(state: number) {
      this.stateFilter = state;
        this.listar_datos();
    }
    @Input() set cambio(cambio: number) {
        if (cambio > 1) {
            this.listar_datos();
        }
    }
    @Output() close = new EventEmitter();

    constructor(
      private snotifyService: SnotifyService,
      private descuentoService: DescuentoService
    ) { 
      this.dtOptions = {
          pagingType: 'full_numbers',
          language: DataSpanidhDatatable
      };
    }

    ngOnInit() {
      this.listar_datos()
    }
    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }
    rerenderTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    }
    async editar(id: number) {
        this.close.emit({ tipo: 2, id: id });
    }
    async listar_datos() {
        if(this.stateFilter == 3){
          this.listadoDescuentos = await this.descuentoService.listar_descuentos().then(result => result);
        }else{
          this.listadoDescuentos = await this.descuentoService.listar_descuentos_filtrados({ estado: this.stateFilter }).then(result => result);
        }
        
        this.rerenderTable();
    }
    async desactivar(id: number) {
        this.snotifyService.async('Actualizando descuento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    await this.descuentoService.cambiar_estado(id, 0);
                    this.close.emit({ tipo: 3 });
                    resolve({
                        title: 'Exito',
                        body: 'Descuento desactivado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo desactivar el descuento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
    }
    async reactivar(id: number) {
        this.snotifyService.async('Actualizando descuento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    await this.descuentoService.cambiar_estado(id, 1);
                    this.close.emit({ tipo: 4 });
                    resolve({
                        title: 'Exito',
                        body: 'Descuento reactivado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo reactivar el descuento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
    }
}
