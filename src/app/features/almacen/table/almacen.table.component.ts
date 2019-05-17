import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NotificationService } from '@app/core/services';
import { AlmacenClass } from '../almacen.class';
import { AlmacenService } from '../almacen.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-almacen-table',
    templateUrl: 'almacen.table.component.html',
    styleUrls: ['almacen.table.component.css']
})

export class AlmacenTableomponent implements OnInit {
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    stateFilter: number;
    listadoAlmacenes: AlmacenClass[];
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
        private almacenService: AlmacenService,
        private snotifyService: SnotifyService
    ) {
        this.dtOptions = {
            pagingType: 'full_numbers',
            language: DataSpanidhDatatable
        };
    }

    ngOnInit() { }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    async listar_datos() {
        this.listadoAlmacenes = await this.almacenService.listar_almacenes_filtradas({ estado: this.stateFilter }).then(result => result);
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
        this.snotifyService.async('Actualizando almacen', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    await this.almacenService.cambiar_estado(id, 0);
                    this.close.emit({ tipo: 3 });
                    resolve({
                        title: 'Exito',
                        body: 'Almacen desactivado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo desactivar la almacen',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
    }
    async reactivar(id: number) {
        this.snotifyService.async('Actualizando almacen', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    await this.almacenService.cambiar_estado(id, 1);
                    this.close.emit({ tipo: 4 });
                    resolve({
                        title: 'Exito',
                        body: 'Almacen reactivado correctamente',
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