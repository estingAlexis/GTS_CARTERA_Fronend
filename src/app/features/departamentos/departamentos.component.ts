import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  c_id_table: number;
  c_accion_form: number;
  c_cambio_table: number;
  f_state_table: number;
  constructor(
    private titleService:Title
  ) { 
     this.titleService.setTitle('Departamentos');
    this.c_accion_form = 1;
    this.c_cambio_table = 1;
    this.f_state_table = 1; 
  }

  ngOnInit() {
  }
  newDepartamento(){
    this.event_treeview({ tipo: 1 });
  }
  event_treeview(event:any): void {
    switch (event.tipo) {
      case 1:
        //apertura de nuevo registro 
        this.c_accion_form = event.tipo;
        break;
      case 2:
        // apertura de edicion
        this.c_accion_form = event.tipo;
        this.c_id_table = event.id;
        break;
      case 3: //:: Desactivado
        this.c_cambio_table++;
        break;
    }
  }
  event_form_departamento(event:any):void {
    switch (event.tipo) {
        case 1: //:: Cerró

            break;
        case 2: //:: Guardó
            this.c_cambio_table++;
            break;
        case 3: //:: Editó
            this.c_cambio_table++;
            break;
    }
    this.c_accion_form = 1;
    this.c_id_table = null;
  }

}
