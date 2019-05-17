import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataSpanidhDatatable } from '@app/constants';
import { BancosClass } from '../bancos.class';
import { BancosService } from '../bancos.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'sa-bancos-table',
  templateUrl: './bancos.table.component.html',
  styleUrls: ['./bancos.table.component.css']
})

export class BancosTableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;
  listadoBancos: BancosClass[];

  @Input() set state(state: number) {
    this.stateFilter = state;
    this.listar_datos();
  }

  @Input() set cambio(cambio: number) {
    if (cambio > 1) {
      this.listar_datos();
    }
  }

  // variable que ayuda a emitir datos a el form padre
  @Output() close = new EventEmitter();

  constructor(
    // se instancia el servicio en una variable para usar sus funciones
    private bancosService: BancosService,
    private snotifyService: SnotifyService
  ) {
    //dtOption nos permite editar la tabla, en este caso se le aplicara el idioma español
    this.dtOptions = {
      pagingType: 'full_numbers',
      // nota: debe ser exportado antes
      language: DataSpanidhDatatable
    };

  }

  ngOnInit() { }

  //despues de que se vea, se recargara la tabla. esto es funcion del plugin
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  // cargado de datos a las tablas
  async listar_datos() {
    //si el parametro es dos, significa que el select esta en todos por tanto cargara todos los datos
    if (this.stateFilter == 2) {
      this.listadoBancos = await this.bancosService.listar_bancos().then(result => result);
    } else {
      //sino hara una filtro con 1 o 0 (activo o inactivo)
      this.listadoBancos = await this.bancosService.listar_bancos_filtrados({ estado: this.stateFilter }).then(result => result);
    }
    //despues se recargara la tabla
    this.rerenderTable();
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

  //funcion de desactivar el banco
  async desactivar(id: number) {
    this.snotifyService.async('Desactivando banco', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          await this.bancosService.cambiar_estado(id, 0);
          this.close.emit({ tipo: 3 });
          resolve({
            title: 'Exito',
            body: 'Banco desactivado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo desactivar el banco',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }

  //funcion de reactivar el banco
  async reactivar(id: number) {
    this.snotifyService.async('Activando banco', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          await this.bancosService.cambiar_estado(id, 1);
          this.close.emit({ tipo: 3 });
          resolve({
            title: 'Exito',
            body: 'Banco activo correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo activar el banco',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }
}
