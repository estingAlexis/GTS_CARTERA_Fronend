import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APP } from '@app/constants';
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';
import { DataReportDto, dataExcelNode } from '@app/core/excelnode.config';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
    providedIn: 'root'
})
export class CarteraService {
    //AppBaseUrl = APP.AppBaseUrl;
    Api = APP.ApiEndpoint;
    public table:string = 'datos_chachagui.csv';
    public data:any;
    constructor(
        private http: HttpClient,
        private pdfMakeService: PdfMakeService
    ) { }
    public sendScv(file: any) {
        return this.http.post(this.Api + '/load', file, httpOptions)
    }
    public getData() {
        return this.http.get(this.Api + '/data', httpOptions)
    }
    public getCarteras() {
        return this.http.get(this.Api + '/carteras', httpOptions)
    }
    public listarProgramas(data: any) {
        return this.http.post(this.Api + '/listar_programas', data, httpOptions)
    }
    public exportExcel(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    public get_asociados(){
        return this.http.get(this.Api + '/get_asociados',  httpOptions).subscribe(
            data=>{
                console.log(data);
                this.data = data;
                for(let item of this.data){
                    console.log(item.nombre);
                    this.update_asociado({nombre: String( item.nombre) , table: this.table});
                }
            }
        );
    }
    /*
                    if(this.data.length > 0){
                    for(let item of this.data){
                        console.log(item.nombre);
                        this.update_asociado({nombre: item.nombre}).subscribe(
                            data => {console.log(data)}
                        );
                    }
                }
    */ 
    public update_asociado(data: any){
        console.log(data);
        //return this.http.post(this.Api+'/update_asociado', data , httpOptions);
    }
    public get_urbanos(){
        return this.http.get(this.Api + '/get_urbanos', httpOptions).subscribe(
            data=>{console.log(data);}
        );
    }
}
