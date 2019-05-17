import { Injectable } from '@angular/core';
import { APP } from '@app/constants';
import { HttpClient } from '@angular/common/http';
import { DescuentoClass } from './descuentos-comerciales.class';
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';
import { DataReportDto, dataExcelNode } from '@app/core/excelnode.config';
import { promise } from 'protractor';

@Injectable({
    providedIn: 'root'
})
export class DescuentoService {
    apiEndpoint = APP.ApiEndpoint;
    AppBaseUrl = APP.AppBaseUrl;

    constructor(
        private http: HttpClient,
        private pdfMakeService: PdfMakeService
    ) { }

    async listar_descuentos(): Promise<DescuentoClass[]> {
        const url = `${this.apiEndpoint}/api/descuento/`;
        return await this.http.get<DescuentoClass[]>(url).toPromise();
    }
    async guardar_descuento(data: DescuentoClass): Promise<DescuentoClass> {
        delete data.id;
        const url = `${this.apiEndpoint}/api/descuento/`;
        return await this.http.post<DescuentoClass>(url, data).toPromise();
    }

    async listar_descuentos_filtrados(filter: object): Promise<DescuentoClass[]> {
        const url = `${this.apiEndpoint}/api/descuento/filter/`;
        return await this.http.post<DescuentoClass[]>(url, filter).toPromise();
    }
    async cambiar_estado(id: number, state: number): Promise<DescuentoClass> {
        const url = `${this.apiEndpoint}/api/descuento/` + id + '/' + state;
        return await this.http.patch<DescuentoClass>(url, {}).toPromise();
    }
    async listar_descuento(id: number): Promise<DescuentoClass> {
        const url = `${this.apiEndpoint}/api/descuento/` + id;
        return await this.http.get<DescuentoClass>(url).toPromise();
    }

    async actualizar_descuento(data: DescuentoClass): Promise<DescuentoClass> {
        const url = `${this.apiEndpoint}/api/descuento/` + data.id;
        delete data.id;
        return await this.http.patch<DescuentoClass>(url, data).toPromise();
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
                    },
                    {
                        text: 'PORCENTAJE',
                        style: 'tableHeader'
                    }]
                ];

                const res = await that.listar_descuentos_filtrados(data).then(result => result);
                for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    console.log(element)
                    data_impri.push([
                        {
                            text: element.codigo,
                            alignment: 'left'
                        },{
                            text: element.nombre,
                            alignment: 'left'
                        },
                        {
                            text: element.descuento+'%',
                            alignment: 'right'
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
                            text: 'LISTADO DE DESCUENTOS',
                            style: 'header'
                        },
                        {
                            style: 'tableDetalle',
                            layout: dataPdfMake.line_layout,
                            fontSize: 5,
                            table: {
                                headerRows: 1,
                                fontSize: 5,
                                widths: ['*', '*', '*'],
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
    async reporteLitadoGeneralExcel(data: any): Promise<any> {
        const res = await this.listar_descuentos_filtrados(data).then(result => result);
        let infoReporte: DataReportDto = new DataReportDto();
        infoReporte.heading = [
            [{
                value: 'REPORTE COMPLETO DE DESCUENTOS COMERCIALES',
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
            },
            descuento: {
                displayName: 'PORCENTAJE',
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
                nombre: element.nombre,
                descuento: element.descuento
            });
        }
        infoReporte.merges = [{
            start: {
                row: 1,
                column: 1
            },
            end: {
                row: 1,
                column: 3
            }
        }]

        
        // const url = `${this.apiEndpoint}/api/core/export-excel`;
        // return this.http.post<DescuentoClass>(url, infoReporte).toPromise();
    }
}
