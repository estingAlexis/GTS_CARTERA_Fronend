import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CobradoresClass } from "../cobradores.class";
import { CobradoresService } from "../cobradores.service";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-cobrador-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class CobradorTableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;
  listadoCobrador: CobradoresClass[];

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
    private cobradoresService: CobradoresService,
    private snotifyService: SnotifyService
  ) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: DataSpanidhDatatable
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  async listar_datos() {
    if (this.stateFilter == 2) {
      this.listadoCobrador = await this.cobradoresService.listar_cobradores().then(result => result);
    } else {
      this.listadoCobrador = await this.cobradoresService.listar_cobradores_filtrados({ estado: this.stateFilter }).then(result => result);

    }
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
    this.snotifyService.async('Actualizando Cobrador', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          await this.cobradoresService.cambiar_estado(id, 0);
          this.close.emit({ tipo: 3 });
          resolve({
            title: 'Exito',
            body: 'Cobrador desactivado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo desactivar el crobrador',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }
  async reactivar(id: number) {
    this.snotifyService.async('Actualizando cobrador', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          await this.cobradoresService.cambiar_estado(id, 1);
          this.close.emit({ tipo: 4 });
          resolve({
            title: 'Exito',
            body: 'Cobrador reactivado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo reactivar la almacen',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }


}
