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
    public imgurl: string = '../../../../assets/img/gts-mini-logo.png';
    public carteras :any;
    public data:any;
    public info:any;
    f_state_table: number = 1;
    public prog: number;
    public nom_prog: string = 'Seleccione el Programa';
    public cartera: string = "Seleccione la Cartera";
    public text:string;
    public programas = [
        {nombre: 'Juridicos', tipo: 1},
        {nombre: 'Asociados', tipo: 5},
        {nombre: 'Urbanos', tipo: 6},
        {nombre: 'Institucionales', tipo: 3},
        {nombre: 'Municipios', tipo: 4},
        {nombre: 'Religiosos', tipo: 2},
        {nombre: 'Restantes', tipo: 0}
    ];

    constructor(
        private titleService: Title,
        private _CarteraService: CarteraService,
        private injector: Injector,
        private http: HttpClient,
        private snotifyService: SnotifyService,
    ) {
        this.titleService.setTitle('GTS LISTAR PROGRAMAS');
        this.prog = 0;
    }
    ngOnInit() {
        this.getCarteras();
        this._CarteraService.get_asociados();    

    }
    public getCarteras(){
        this._CarteraService.getCarteras().subscribe(
            data =>{this.carteras = data, console.log(data)}
        );
    }
    public listar_Programas(){
        let table:string = 'datos_chachagui.csv'
        this._CarteraService.listarProgramas({table: table , prog: this.prog}).subscribe(
            data=>{
                console.log(data),
                this.info = data,
                this.snotifyService.success('Consulta Realizada');
            }
        );
    }
    public exportExcel(){
        if(this.info == null || this.info.lenght == 0 ){
            this.snotifyService.info('No hay informacion para exportar');
        }else{
            this._CarteraService.exportExcel(this.info, 'GTS');
        }
    }

    public onKeydown(event) {
        let num = 1;
        if (event.key === "Enter") {
            console.log(num = + 1);
        }
    }
    public selectCartera(nombre: string){
        this.cartera = nombre
    }
    public setPrograma(value: number, nombre: string){
        this.prog = value;
        this.nom_prog = nombre;
        this.listar_Programas();
    }
}
