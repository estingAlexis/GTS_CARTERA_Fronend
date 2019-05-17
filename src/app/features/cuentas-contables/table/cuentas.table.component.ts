import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataSpanidhDatatable } from '@app/constants';
import { Subject } from 'rxjs';
import { SnotifyService } from 'ng-snotify';
import { DataTableDirective } from 'angular-datatables';
import { CuentasContablesClass } from '../cuentas-contables.class';
import { CuentasContService } from '../cuentas-cont.service';

@Component({
  selector: 'sa-cuentas-table',
  templateUrl: './cuentas.table.component.html',
  styleUrls: ['./cuentas.table.component.css']
})
export class CuentasTableComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;
  listadoCuentas: CuentasContablesClass[];

  @Input() set state(state: number) {
    this.stateFilter = state;
    this.listar_datos();
  }

  @Input() set cambio(cambio: number) {
    if (cambio > 1) {
      this.listar_datos();
    }
  }

  constructor(
    private snotifyService: SnotifyService,
    private cuentasContService: CuentasContService
  ) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: DataSpanidhDatatable
    }
  }

  ngOnInit() {
  }

  //despues de que se vea, se recargara la tabla. esto es funcion del plugin
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  // variable que ayuda a emitir datos a el form padre
  @Output() close = new EventEmitter();

  async listar_datos() {

    if (this.stateFilter == 2) {
      this.listadoCuentas = await this.cuentasContService.listar_cuentas().then(result => result);
    } else {
      this.listadoCuentas = await this.cuentasContService.listar_cuentas_filtradas({ estado: this.stateFilter }).then(result => result);
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

  async desactivar(id: number) {
    this.snotifyService.async('Desactivando cuenta', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          await this.cuentasContService.cambiar_estado(id, 0);
          this.close.emit({ tipo: 3 });
          resolve({
            title: 'Exito',
            body: 'Cuenta desactivada correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo desactivar la cuenta',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }

  async reactivar(id: number) {
    this.snotifyService.async('Activando cuenta', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          await this.cuentasContService.cambiar_estado(id, 1);
          this.close.emit({ tipo: 3 });
          resolve({
            title: 'Exito',
            body: 'Cuenta activada correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo activar la cuenta',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }
}
