import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ClasesClass } from '../clases.class';
import { ClasesService } from '../clases.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'sa-table-clase',
  templateUrl: './table-clase.component.html',
  styleUrls: ['./table-clase.component.css']
})
export class TableClaseComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;
  listadoClases: ClasesClass[];

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
    private clasesService: ClasesService,
    private snotifyService: SnotifyService
  ) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: DataSpanidhDatatable
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnInit() {
  }
  async listar_datos() {
    if (this.stateFilter == 2) {
      this.listadoClases = await this.clasesService.listar_clases().then(result => result);
    } else {
      this.listadoClases = await this.clasesService.listar_clases_filtrados({ estado: this.stateFilter }).then(result => result);

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
          await this.clasesService.cambiar_estado(id, 0);
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
    this.snotifyService.async('Actualizando clase', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          await this.clasesService.cambiar_estado(id, 1);
          this.close.emit({ tipo: 4 });
          resolve({
            title: 'Exito',
            body: 'Clase reactivado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo reactivar la clase',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }

}
