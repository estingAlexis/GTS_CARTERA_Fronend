import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlmacenService } from './almacen.service';
import { openPdfMake } from '@app/core/pdfmake.config';

@Component({
    selector: 'app-almacen',
    templateUrl: './almacen.component.html',
    styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {

    c_id_table: number;
    c_accion_form: number;
    c_cambio_table: number;
    f_state_table: number;

    constructor(
        private almacenService: AlmacenService,
        private titleService: Title
    ) {
        this.titleService.setTitle('Almacen');
        this.c_accion_form = 0;
        this.c_cambio_table = 1;
        this.f_state_table = 1;
    }

    ngOnInit() {
    }

    newAlmacen() {
        this.event_table_almacen({ tipo: 1 });
    }
    event_table_almacen(event: any): void {
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

    event_form_almacen(event): void {
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
        const doc = await this.almacenService.reporteLitadoGeneralPdf({ ESTADO: this.f_state_table });
        openPdfMake(doc);
    }

    async export_excel() {
        const data = await this.almacenService.reporteLitadoGeneralExcel({ ESTADO: this.f_state_table }).then(res => res);
        let url = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
        window.open(url, '_blank');

    }
}
