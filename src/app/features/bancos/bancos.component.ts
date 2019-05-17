import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BancosService } from './bancos.service';
import { openPdfMake } from '@app/core/pdfmake.config';

@Component({
  selector: 'sa-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {
  c_id_table: number;
  c_accion_form: number;
  c_cambio_table: number;
  f_state_table: number;

  constructor(
    private titleService: Title,
    private bancoService: BancosService
  ) {
    this.titleService.setTitle('Bancos');
    this.c_accion_form = 0;
    this.c_cambio_table = 1;
    this.f_state_table = 1;
  }

  ngOnInit() {
  }

  newBanco() {
    this.event_table_bancos({ tipo: 1 })
  }

  event_table_bancos(event: any): void {

    switch (event.tipo) {

      case 1:
        //apertura de nuevo registro 
        this.c_accion_form = event.tipo;
        break;

      case 2:
        // apertura de edicion
        this.c_accion_form = event.tipo;
        this.c_id_table = event.id;
        break;

      case 3: //:: Desactivado
        this.c_cambio_table++;
        break;
    }

  }
  // fin del evento table

  event_form_banco(event) {

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
    const doc = await this.bancoService.reporteLitadoGeneralPdf({ ESTADO: this.f_state_table });
    openPdfMake(doc);
  }

}
