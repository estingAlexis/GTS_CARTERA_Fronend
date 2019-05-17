import { Component, OnInit, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'sa-sublineas-form',
  templateUrl: './sublineas.form.component.html',
  styleUrls: ['./sublineas.form.component.css']
})
export class SublineasFormComponent implements OnInit {

  form_accion: number;


  @Input() set accion(accion: number) {

    this.form_accion = accion;

    switch (accion) {

      case 1:
        this.ngxSmartModalService.getModal('cuentas_form_modal').open();
        break;
    }

  }

  constructor(
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
  }

  accion_form(event) {

  }

  cerrar() {
    this.ngxSmartModalService.getModal('cuentas_form_modal').close();
  }
}
