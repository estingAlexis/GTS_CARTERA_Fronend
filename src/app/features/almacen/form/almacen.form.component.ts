import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl } from '@angular/forms';
import { AlmacenClass } from '../almacen.class';
import { AlmacenService } from '../almacen.service';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-almacen-form',
    templateUrl: 'almacen.form.component.html',
    styleUrls: ['almacen.form.component.css']
})

export class AlmacenFormComponent implements OnInit {
    c_accion: number;
    formData: AlmacenClass;

    @Input() set accion(accion: number) {
        this.c_accion = accion;
        switch (accion) {
            case 1: //:: nuevo
                this.formData = new AlmacenClass();
                this.ngxSmartModalService.getModal('almacen_form_modal').open();
                break;
            case 2: //:: editar
                this.ngxSmartModalService.getModal('almacen_form_modal').open();
                break;
        }
    }
    @Input() set idIn(id: number) {
        if (id) { //:: editar
            this.formData = new AlmacenClass();
            this.almacenService.listar_almacen(id).then(data => {
                this.formData = data;
            })
        }
    }
    @Output() close = new EventEmitter();


    constructor(
        private almacenService: AlmacenService,
        public ngxSmartModalService: NgxSmartModalService,
        private snotifyService: SnotifyService
    ) {
        this.formData = new AlmacenClass();
    }

    ngOnInit() { }

    cerrar() {
        this.ngxSmartModalService.getModal('almacen_form_modal').close();
        this.close.emit({ tipo: 1 });
    }

    async guardar(form: FormControl) {
        this.snotifyService.async('Guardando almacen', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    const data = Object.assign({}, this.formData);
                    await this.almacenService.guardar_almacen(data);
                    form.reset();
                    resolve({
                        title: 'Exito',
                        body: 'Almacen gurdado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.ngxSmartModalService.getModal('almacen_form_modal').close();
                    this.close.emit({ tipo: 2 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo guardar la almacen',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
    }
    async editar(form: FormControl) {
        this.snotifyService.async('Actualizando almacen', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    const data = Object.assign({}, this.formData);
                    await this.almacenService.actualizar_almacen(data);
                    form.reset();
                    resolve({
                        title: 'Exito',
                        body: 'Almacen actualizado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.ngxSmartModalService.getModal('almacen_form_modal').close();
                    this.close.emit({ tipo: 3 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo actualizar la almacen',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
    }

}