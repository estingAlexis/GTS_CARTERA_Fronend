import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APP } from '@app/constants';
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';
import { DataReportDto, dataExcelNode } from '@app/core/excelnode.config';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CarteraService {

  AppBaseUrl = APP.AppBaseUrl;
  data = [
    {id: 1, nombre: 'juan'},
    {id: 2, nombre: 'maria'}
  ];
  constructor(
    private http: HttpClient,
    private pdfMakeService: PdfMakeService
    ) { }
  public sendScv(file: any){
    this.http.post(this.AppBaseUrl+'/input', file, httpOptions)
  }

  async reporteLitadoGeneralExcel(data: any): Promise<any> {
    //const res = await this.listar_almacenes_filtradas(data).then(result => result);
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
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
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

    const url = this.AppBaseUrl+'/input';
    return this.http.post<any>(url, infoReporte).toPromise();
}

async reporteLitadoGeneralPdf(data: any): Promise<any> {
    const that = this;
    return new Promise(async (resolve, reject) => {
        that.pdfMakeService.convertImgToBase64URL('http://localhost:4200/assets/img/gts-mini-logo.png', async function(base64Img) {
            let data_impri: any = [
                [{
                    text: 'CODIGO',
                    style: 'tableHeader'
                }, {
                    text: 'NOMBRE',
                    style: 'tableHeader'
                }]
            ];

            //const res = await that.listar_almacenes_filtradas(data).then(result => result);
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
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
