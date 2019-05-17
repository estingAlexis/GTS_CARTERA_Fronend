import { Injectable } from '@angular/core';
import { APP } from '@app/constants';
import { HttpClient } from '@angular/common/http';
import { AlmacenClass } from './almacen.class';
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';
import { DataReportDto, dataExcelNode } from '@app/core/excelnode.config';

@Injectable({
    providedIn: 'root'
})
export class AlmacenService {
    apiEndpoint = APP.ApiEndpoint;
    AppBaseUrl = APP.AppBaseUrl;

    constructor(
        private http: HttpClient,
        private pdfMakeService: PdfMakeService
    ) { }

    async listar_almacenes(): Promise<AlmacenClass[]> {
        const url = `${this.apiEndpoint}/api/almacen/`;
        return await this.http.get<AlmacenClass[]>(url).toPromise();
    }
    async listar_almacenes_filtradas(filter: object): Promise<AlmacenClass[]> {
        const url = `${this.apiEndpoint}/api/almacen/filter/`;
        return await this.http.post<AlmacenClass[]>(url, filter).toPromise();
    }
    async listar_almacen(id: number): Promise<AlmacenClass> {
        const url = `${this.apiEndpoint}/api/almacen/` + id;
        return await this.http.get<AlmacenClass>(url).toPromise();
    }

    async guardar_almacen(data: AlmacenClass): Promise<AlmacenClass> {
        delete data.id;
        const url = `${this.apiEndpoint}/api/almacen/`;
        return await this.http.post<AlmacenClass>(url, data).toPromise();
    }
    async actualizar_almacen(data: AlmacenClass): Promise<AlmacenClass> {
        const url = `${this.apiEndpoint}/api/almacen/` + data.id;
        delete data.id;
        return await this.http.patch<AlmacenClass>(url, data).toPromise();
    }
    async cambiar_estado(id: number, state: number): Promise<AlmacenClass> {
        const url = `${this.apiEndpoint}/api/almacen/` + id + '/' + state;
        return await this.http.patch<AlmacenClass>(url, {}).toPromise();
    }

    async reporteLitadoGeneralExcel(data: any): Promise<any> {
        const res = await this.listar_almacenes_filtradas(data).then(result => result);
        let infoReporte: DataReportDto = new DataReportDto();
        infoReporte.heading = [
            [{
                value: 'REPORTE COMPLETO DE PERMISOS',
                style: dataExcelNode.styles.headerReport
            }]
        ]
        infoReporte.specification = {
            id: {
                displayName: 'CODIGO',
                headerStyle: dataExcelNode.styles.headerDark,
                cellStyle: dataExcelNode.styles.fila1,
                width: 100
            },
            nombre: {
                displayName: 'NOMBRE',
                headerStyle: dataExcelNode.styles.headerDark,
                cellStyle: dataExcelNode.styles.fila1,
                width: 250
            }
        }
        infoReporte.dataset = []
        for (let i = 0; i < res.length; i++) {
            const element = res[i];
            infoReporte.dataset.push({
                id: element.id,
                nombre: element.nombre
            });
        }
        infoReporte.merges = [{
            start: {
                row: 1,
                column: 1
            },
            end: {
                row: 1,
                column: 2
            }
        }]

        const url = `${this.apiEndpoint}/api/core/export-excel`;
        return this.http.post<AlmacenClass>(url, infoReporte).toPromise();
    }

    async reporteLitadoGeneralPdf(data: any): Promise<any> {
        const that = this;
        return new Promise(async (resolve, reject) => {
            that.pdfMakeService.convertImgToBase64URL(that.AppBaseUrl + '/assets/img/pos/logo.png', async function(base64Img) {
                let data_impri: any = [
                    [{
                        text: 'CODIGO',
                        style: 'tableHeader'
                    }, {
                        text: 'NOMBRE',
                        style: 'tableHeader'
                    }]
                ];

                const res = await that.listar_almacenes_filtradas(data).then(result => result);
                for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    data_impri.push([
                        {
                            text: element.id,
                            alignment: 'left'
                        }, {
                            text: element.nombre,
                            alignment: 'left'
                        }
                    ]);
                }

                dataLogPdf.layout = dataPdfMake.line_layout;
                let docDefinition = {
                    style: 'tableSubinfo',
                    layout: dataPdfMake.line_layout,
                    content: [
                        {
                            image: base64Img,
                            width: 100
                        },
                        {
                            text: 'LISTADO DE PERMISOS',
                            style: 'header'
                        },
                        {
                            style: 'tableDetalle',
                            layout: dataPdfMake.line_layout,
                            fontSize: 5,
                            table: {
                                headerRows: 1,
                                fontSize: 5,
                                widths: ['auto', '*'],
                                body: data_impri
                            }
                        },
                        dataLogPdf
                    ],
                    styles: dataPdfMake.styles,
                    pageSize: 'LETTER',
                    pageMargins: [20, 20, 20, 20]
                };
                resolve(docDefinition);
            }, null);
        });
    }
}
