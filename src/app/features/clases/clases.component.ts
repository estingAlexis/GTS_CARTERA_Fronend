import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClasesService } from './clases.service'
import { openPdfMake } from '@app/core/pdfmake.config';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {
  c_id_table: number;
  c_accion_form: number;
  c_cambio_table: number;
  f_state_table: number;
  constructor(
    private clasesService: ClasesService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Clases de Producto');
    this.c_accion_form = 0;
    this.c_cambio_table = 1;
    this.f_state_table = 1;
  }

  ngOnInit() {
  }
  newClase() {
    this.event_table_clases({ tipo: 1 });
  }

  event_table_clases(event: any): void {
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
  event_form_clases(event): void {
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
    const doc = await this.clasesService.reporteListadoGeneralPdf({ ESTADO: this.f_state_table });
    openPdfMake(doc);
  }

}
