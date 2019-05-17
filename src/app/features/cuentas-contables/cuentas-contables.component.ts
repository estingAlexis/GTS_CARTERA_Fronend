import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { openPdfMake } from '@app/core/pdfmake.config';
import { CuentasContService } from './cuentas-cont.service';

@Component({
  selector: 'sa-cuentas-contables',
  templateUrl: './cuentas-contables.component.html',
  styleUrls: ['./cuentas-contables.component.css']
})
export class CuentasContablesComponent implements OnInit {

  c_id_table: number;
  c_accion_form: number;
  c_cambio_table: number;
  f_state_table: number;

  constructor(
    private titleService: Title,
    private cuentasContService: CuentasContService
  ) {
    this.titleService.setTitle('Cuentas Contables');
    this.c_accion_form = 0;
    this.c_cambio_table = 1;
    this.f_state_table = 1;
  }

  ngOnInit() {
  }

  newCuenta() {
    this.event_table_cuentas({ tipo: 1 });
  }

  event_table_cuentas(event: any): void {

    switch (event.tipo) {
      case 1:
        //registro
        this.c_accion_form = event.tipo;
        break;
      case 2:
        //edicion
        this.c_accion_form = event.tipo;
        this.c_id_table = event.id;
        break;
      case 3:
        //desactivacion
        this.c_cambio_table++;
        break;
    }
  }

  event_form_cuentas(event) {

    switch (event.tipo) {

      case 1:
        //funcion nula ya que la variable que despliega el modal sera inicializada nuevamente debajo
        break;
      case 2: //:: Guardó
        this.c_cambio_table++;
        break;
      case 3: //:: Editó
        this.c_cambio_table++;
        break;
    }
    this.c_accion_form = 0;
    this.c_id_table = null;
  }

  async export_pdf() {
    const doc = await this.cuentasContService.reporteLitadoGeneralPdf({ ESTADO: this.f_state_table });
    openPdfMake(doc);
  }
}
