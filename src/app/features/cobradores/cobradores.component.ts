import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CobradoresService } from './cobradores.service';
import { openPdfMake } from '@app/core/pdfmake.config';

@Component({
  selector: 'cobradores-app',
  templateUrl: './cobradores.component.html',
  styleUrls: ['./cobradores.component.css']
})
export class CobradoresComponent implements OnInit {
  c_id_table: number;
  c_accion_form: number;
  c_cambio_table: number;
  f_state_table: number;
  constructor(
    private cobradoresService: CobradoresService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Cobradores');
    this.c_accion_form = 0;
    this.c_cambio_table = 1;
    this.f_state_table = 1;
  }

  ngOnInit() {
  }
  newCobrador() {
    this.event_table_cobrador({ tipo: 1 });
  }


  event_table_cobrador(event: any): void {
    switch (event.tipo) {
      case 1: //:: Nuevo
        this.c_accion_form = event.tipo;
        break;
      case 2: //:: Editar
        this.c_accion_form = event.tipo;
        this.c_id_table = event.id;
        break;
      case 3: //:: Desactivado
        this.c_cambio_table++;
        break;
      case 4: //:: Reactivado
        this.c_cambio_table++;
        break;
    }
  }

  event_form_cobrador(event): void {
    switch (event.tipo) {
      case 1: //:: Cerró

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
    const doc = await this.cobradoresService.reporteListadoGeneralPdf({ ESTADO: this.f_state_table });
    openPdfMake(doc);
  }
}
