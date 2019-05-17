import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { openPdfMake } from '@app/core/pdfmake.config';
import { DescuentoService } from './descuentos.service'

@Component({
    selector: 'sa-descuentos-comerciales',
    templateUrl: './descuentos-comerciales.component.html',
    styleUrls: ['./descuentos-comerciales.component.css']
})
export class DescuentosComercialesComponent implements OnInit {
    c_id_table: number;
    c_accion_form: number;
    c_cambio_table: number;
    f_state_table: number;
    constructor(
        private titleService: Title,
        private descuentoService: DescuentoService
    ) {
        this.titleService.setTitle('Descuentos comerciales');
        this.c_accion_form = 0;
        this.c_cambio_table = 1;
        this.f_state_table = 1;
    }

    ngOnInit() {
    }
    newDescuento() {
        this.event_table_descuento({ tipo: 1 });
    }
    event_table_descuento(event: any): void {
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
    async export_pdf() {
        const doc = await this.descuentoService.reporteLitadoGeneralPdf({ ESTADO: this.f_state_table });
        openPdfMake(doc);
    }
    async export_excel() {
        const data = await this.descuentoService.reporteLitadoGeneralExcel({ ESTADO: this.f_state_table }).then(res => res);
        let url = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
        window.open(url, '_blank');
    }
    event_form_descuento(event): void {
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
}
