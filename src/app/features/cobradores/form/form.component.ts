import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CobradoresClass } from '../cobradores.class';
import { CobradoresService } from '../cobradores.service';
import { FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-cobradores-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class CobradorFormComponent implements OnInit {
  c_accion: number;
  formData: CobradoresClass
  @Input()
  set accion(accion: any) {
    this.c_accion = accion;
    switch (accion) {
      case 1: //:: nuevo
        this.formData = new CobradoresClass();
        this.ngxSmartModalService.getModal('cobrador_form_modal').open();
        break;
      case 2: //:: editar
        this.ngxSmartModalService.getModal('cobrador_form_modal').open();
        break;
    }
  }

  @Input() set idIn(id: number) {
    if (id) { //:: editar
      this.formData = new CobradoresClass();
      this.cobradoresService.listar_cobrador(id).then(data => {
        console.log(data)
        this.formData = data;
      })
    }
  }
  @Output() close = new EventEmitter();

  constructor
    (
      private ngxSmartModalService: NgxSmartModalService,
      private cobradoresService: CobradoresService,
      private snotifyService: SnotifyService
    ) {
    this.formData = new CobradoresClass();
  }


  cerrar() {
    this.ngxSmartModalService.getModal('cobrador_form_modal').close();
    this.close.emit({ tipo: 1 });
  }
  ngOnInit() {
  }
  guardar(form: FormControl) {
    this.snotifyService.async('Guardando almacen', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          const data = Object.assign({}, this.formData);
          await this.cobradoresService.guardar_cobrador(data);
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
          this.ngxSmartModalService.getModal('cobrador_form_modal').close();
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
          await this.cobradoresService.actualizar_cobrador(data);
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
          this.ngxSmartModalService.getModal('cobrador_form_modal').close();
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
