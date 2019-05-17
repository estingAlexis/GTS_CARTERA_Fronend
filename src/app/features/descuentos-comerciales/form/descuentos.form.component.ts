import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { DescuentoClass } from '../descuentos-comerciales.class'
import { DescuentoService } from '../descuentos.service'
@Component({
  selector: 'app-descuento-form',
  templateUrl: './descuentos.form.component.html',
  styleUrls: ['./descuentos.form.component.css']
})
export class DescuentosFormComponent implements OnInit {
  c_accion: number;
  formData: DescuentoClass;
  @Input() set accion(accion: number) {
      this.c_accion = accion;
      switch (accion) {
          case 1: //:: nuevo
              this.formData = new DescuentoClass();
              this.ngxSmartModalService.getModal('descuento_form_modal').open();
              break;
          case 2: //:: editar
              this.ngxSmartModalService.getModal('descuento_form_modal').open();
              break;
      }
  }
  @Input() set idIn(id: number) {
    if (id) { //:: editar
        this.formData = new DescuentoClass();
        this.descuentoService.listar_descuento(id).then(data => {
            this.formData = data;
        })
    }
} 
  @Output() close = new EventEmitter();

  constructor(
    private snotifyService: SnotifyService,
    public ngxSmartModalService: NgxSmartModalService,
    private descuentoService: DescuentoService
  ) { 
    this.formData = new DescuentoClass();
  }
  ngOnInit() {
  }
  cerrar() {
      this.ngxSmartModalService.getModal('descuento_form_modal').close();
      this.close.emit({ tipo: 1 });
  }
  
  async guardar(form: FormControl) {
      console.log(this.formData)
        this.snotifyService.async('Guardando descuento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    const data = Object.assign({}, this.formData);
                    await this.descuentoService.guardar_descuento(data);
                    form.reset();
                    resolve({
                        title: 'Exito',
                        body: 'Descuento gurdado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.ngxSmartModalService.getModal('descuento_form_modal').close();
                    this.close.emit({ tipo: 2 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo guardar el descuento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
    }
    async editar(form: FormControl) {
        this.snotifyService.async('Actualizando descuento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    const data = Object.assign({}, this.formData);
                    await this.descuentoService.actualizar_descuento(data);
                    form.reset();
                    resolve({
                        title: 'Exito',
                        body: 'Descuento actualizado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.ngxSmartModalService.getModal('descuento_form_modal').close();
                    this.close.emit({ tipo: 3 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo actualizar el descuento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
    }
}
