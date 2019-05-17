import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClasesClass } from '../clases.class';
import { ClasesService } from '../clases.service';
import { FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'sa-form-clase',
  templateUrl: './form-clase.component.html',
  styleUrls: ['./form-clase.component.css']
})
export class FormClaseComponent implements OnInit {
  c_accion: number;
  formData: ClasesClass

  @Input()
  set accion(accion: any) {
    this.c_accion = accion;
    switch (accion) {
      case 1: //:: nuevo
        this.formData = new ClasesClass();
        this.ngxSmartModalService.getModal('clases_form_modal').open();
        break;
      case 2: //:: editar
        this.ngxSmartModalService.getModal('clases_form_modal').open();
        break;
    }
  }

  @Input() set idIn(id: number) {
    if (id) { //:: editar
      this.formData = new ClasesClass();
      this.clasesService.listar_clase(id).then(data => {
        console.log(data)
        this.formData = data;
      })
    }
  }


  @Output() close = new EventEmitter();

  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private clasesService: ClasesService,
    private snotifyService: SnotifyService
  ) { }

  cerrar() {
    this.ngxSmartModalService.getModal('clases_form_modal').close();
    this.close.emit({ tipo: 1 });
  }

  ngOnInit() {
  }

  guardar(form: FormControl) {
    this.snotifyService.async('Guardando clase', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          const data = Object.assign({}, this.formData);
          await this.clasesService.guardar_clase(data);
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
          this.ngxSmartModalService.getModal('clases_form_modal').close();
          this.close.emit({ tipo: 2 });
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo guardar la clase',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }

  async editar(form: FormControl) {
    this.snotifyService.async('Actualizando clase', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          const data = Object.assign({}, this.formData);
          await this.clasesService.actualizar_clase(data);
          form.reset();
          resolve({
            title: 'Exito',
            body: 'Clase actualizado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
          this.ngxSmartModalService.getModal('clases_form_modal').close();
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
