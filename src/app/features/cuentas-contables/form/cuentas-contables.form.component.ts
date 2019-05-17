import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { CuentasContablesClass } from '../cuentas-contables.class';
import { CuentasContService } from '../cuentas-cont.service';

@Component({
  selector: 'sa-cuentas_contables-form',
  templateUrl: './cuentas-contables.form.component.html',
  styleUrls: ['./cuentas-contables.form.component.css']
})
export class CuentascontablesFormComponent implements OnInit {

  c_accion: number;
  formData: CuentasContablesClass;
  f_state_table: number;

  @Input() set accion(accion: number) {
    this.c_accion = accion;

    switch (accion) {
      case 1: //:: nuevo
        this.formData = new CuentasContablesClass();
        this.ngxSmartModalService.getModal('cuentas_form_modal').open();
        break;
      case 2: //:: editar
        this.ngxSmartModalService.getModal('cuentas_form_modal').open();
        break;
    }
  }

  @Input() set idtb(id: number) {
    if (id) { //:: editar
      this.formData = new CuentasContablesClass();
      this.cuentasContService.listar_cuenta(id).then(data => {
        this.formData = data;
        this.formData.retencion = (data.retencion == 1) ? true : false
        this.formData.movimientos = (data.movimientos == 1) ? true : false
      });
    }
  }

  @Output() close = new EventEmitter();

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private cuentasContService: CuentasContService,
    public snotifyService: SnotifyService
  ) {
    this.formData = new CuentasContablesClass();
  }

  ngOnInit() {
  }

  cerrar() {
    this.ngxSmartModalService.getModal('cuentas_form_modal').close();
    this.close.emit({ tipo: 1 });
  }

  async guardar(form: FormControl) {
    //validacion si los checkbox han sido clickeado
    this.formData.retencion = Number(this.formData.retencion);
    this.formData.movimientos = Number(this.formData.movimientos);

    //el termino number ayuda a transformar boolean a numerico
    this.snotifyService.async('Guardando cuenta', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          const data = Object.assign({}, this.formData);
          await this.cuentasContService.guardar_cuenta(data);
          form.reset();
          resolve({
            title: 'Exito',
            body: 'Cuenta guardado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
          this.ngxSmartModalService.getModal('cuentas_form_modal').close();
          this.close.emit({ tipo: 2 });
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo guardar la cuenta',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }

  // funcion de actualizar
  async editar(form: FormControl) {
    //transformacion de boolean a numerico
    this.formData.retencion = Number(this.formData.retencion);
    this.formData.movimientos = Number(this.formData.movimientos);

    this.snotifyService.async('Actualizando cuenta', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          const data = Object.assign({}, this.formData);
          await this.cuentasContService.actualizar_cuenta(data);
          form.reset();
          resolve({
            title: 'Exito',
            body: 'Cuenta actualizada correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
          this.ngxSmartModalService.getModal('cuentas_form_modal').close();
          this.close.emit({ tipo: 3 });
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo actualizar el cuenta',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }
}
