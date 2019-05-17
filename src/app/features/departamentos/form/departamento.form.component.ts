import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { DepartamentoClass } from '../departamento.class';
import { DepartamentosService } from '../departamentos.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento.form.component.html',
  styleUrls: ['./departamento.form.component.css']
})
export class DepartamentoFormComponent implements OnInit {
  formData: DepartamentoClass;
  c_accion: number;

  @Input() set accion(accion: number) {
    this.c_accion = accion;
    switch (accion) {
      case 1: //:: nuevo
        this.formData = new DepartamentoClass();
        break;
      case 2: //:: editar
        break;
    }
  }
  @Input() set idIn(id: number) {
      if (id) { //:: editar
          this.formData = new DepartamentoClass();
          this.departamentosService.listar_departamento(id).then(data => {
              this.formData = data;
          })
      }
  } 
  @Output() close = new EventEmitter();

  constructor(
    private departamentosService:DepartamentosService,
    private snotifyService:SnotifyService
  ) { 
    this.formData = new DepartamentoClass();
  }

  ngOnInit() {
  }
  async guardar(form: FormControl) {
        this.snotifyService.async('Guardando departamento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    const data = Object.assign({}, this.formData);
                    await this.departamentosService.guardar_departamento(data);
                    form.reset();
                    resolve({
                        title: 'Exito',
                        body: 'Departamento guardado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.close.emit({ tipo: 2 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo guardar el departamento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
  }
  async editar(form: FormControl) {
        this.snotifyService.async('Actualizando departamento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    const data = Object.assign({}, this.formData);
                    await this.departamentosService.actualizar_departamento(data);
                    form.reset();
                    resolve({
                        title: 'Exito',
                        body: 'Departamento actualizado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.close.emit({ tipo: 2 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo actualizar el departamento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
  }
  async desactivar(form: FormControl) {
        this.snotifyService.async('Desactivando departamento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    await this.departamentosService.cambiar_estado(this.formData.id,0);
                    this.close.emit({ tipo: 3 });
                    resolve({
                        title: 'Exito',
                        body: 'Departamento desactivado correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.close.emit({ tipo: 2 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo descativar el departamento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
  }
  async reactivar(form: FormControl) {
        this.snotifyService.async('Activando departamento', 'Procesando',
            new Promise(async (resolve, reject) => {
                try {
                    await this.departamentosService.cambiar_estado(this.formData.id,1);
                    this.close.emit({ tipo: 3 });
                    resolve({
                        title: 'Exito',
                        body: 'Departamento activo correctamente',
                        config: {
                            showProgressBar: true,
                            closeOnClick: true,
                            timeout: 3000
                        }
                    })
                    this.close.emit({ tipo: 2 });
                } catch (error) {
                    reject({
                        title: 'Error!!!',
                        body: 'No se puedo activar el departamento',
                        config: { closeOnClick: true }
                    })
                }
            })
        );
  }
}
