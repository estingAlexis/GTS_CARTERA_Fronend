import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BancosClass } from '../bancos.class';
import { BancosService } from '../bancos.service'
import { FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
// partes que conforman el componente
@Component({
  selector: 'sa-bancos-form',
  templateUrl: './bancos.form.component.html',
  styleUrls: ['./bancos.form.component.css']
})

export class bancosFormComponent implements OnInit {

  c_accion: number;
  formData: BancosClass;

  @Input() set accion(accion: number) {
    this.c_accion = accion;
    // alert(accion);

    switch (accion) {
      case 1: //:: nuevo
        this.formData = new BancosClass();
        this.ngxSmartModalService.getModal('banco_form_modal').open();
        break;
      case 2: //:: editar
        this.ngxSmartModalService.getModal('banco_form_modal').open();
        break;
    }
  }

  @Input() set idtb(id: number) {
    if (id) { //:: editar
      this.formData = new BancosClass();
      this.bancoService.listar_banco(id).then(data => {
        this.formData = data;
      });
    }
  }

  //funcion para cerrar el modal
  @Output() close = new EventEmitter();

  constructor(
    //variable que se inicializa con la importacion del modal_service
    public ngxSmartModalService: NgxSmartModalService,
    private bancoService: BancosService,
    private snotifyService: SnotifyService
  ) {
    //variable instanciada para poder usar las variables de la clase banco
    this.formData = new BancosClass();
  }

  ngOnInit() {
  }

  cerrar() {
    this.ngxSmartModalService.getModal('banco_form_modal').close();
    this.close.emit({ tipo: 1 });
  }

  guardar(form: FormControl) {
    this.snotifyService.async('Guardando banco', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          const data = Object.assign({}, this.formData);
          await this.bancoService.guardar_banco(data);
          form.reset();
          resolve({
            title: 'Exito',
            body: 'Banco guardado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
          this.ngxSmartModalService.getModal('banco_form_modal').close();
          this.close.emit({ tipo: 2 });
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo guardar el banco',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }

  // funcion de actualizar
  async editar(form: FormControl) {
    this.snotifyService.async('Actualizando banco', 'Procesando',
      new Promise(async (resolve, reject) => {
        try {
          const data = Object.assign({}, this.formData);
          await this.bancoService.actualizar_banco(data);
          form.reset();
          resolve({
            title: 'Exito',
            body: 'Banco actualizado correctamente',
            config: {
              showProgressBar: true,
              closeOnClick: true,
              timeout: 3000
            }
          })
          this.ngxSmartModalService.getModal('banco_form_modal').close();
          this.close.emit({ tipo: 3 });
        } catch (error) {
          reject({
            title: 'Error!!!',
            body: 'No se puedo actualizar el banco',
            config: { closeOnClick: true }
          })
        }
      })
    );
  }
}
