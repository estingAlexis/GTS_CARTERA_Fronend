import { Component, OnInit, ɵConsole, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CarteraService } from '../cartera.service';
import { HttpClient } from '@angular/common/http';
import { openPdfMake } from '@app/core/pdfmake.config';
import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
declare var $: any;

@Component({
    selector: 'app-listar-programas',
    templateUrl: './listar-programas.component.html',
    styleUrls: ['./listar-programas.component.css']
})
export class ListarProgramasComponent implements OnInit {
    f_state_table: number = 1;
    public sv: number;
    constructor(
        private titleService: Title,
        private _CarteraService: CarteraService,
        private injector: Injector,
        private http: HttpClient,
        private snotifyService: SnotifyService
    ) {
        this.titleService.setTitle('GTS LISTAR PROGRAMAS');
        this.sv = 0;
    }

    ngOnInit() {
    }

    async export_pdf() {
        const doc = await this._CarteraService.reporteLitadoGeneralPdf({ ESTADO: this.f_state_table });
        openPdfMake(doc);
    }

    log(data) {
        console.log(this.sv);
    }

    onKeydown(event) {
        let num = 1;
        if (event.key === "Enter") {
            console.log(num = + 1);
        }
    }

}
