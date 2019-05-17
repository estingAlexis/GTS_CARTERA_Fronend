import { Injectable } from '@angular/core';
import { APP } from '@app/constants';
import { HttpClient } from '@angular/common/http';
import { BancosClass } from './bancos.class';
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';
import { DataReportDto, dataExcelNode } from '@app/core/excelnode.config';

@Injectable({
  providedIn: 'root'
})

export class BancosService {
  apiEndpoint = APP.ApiEndpoint;
  AppBaseUrl = APP.AppBaseUrl;
  constructor(
    private http: HttpClient,
    private pdfMakeService: PdfMakeService
  ) { }

  async guardar_banco(data: BancosClass): Promise<BancosClass> {
    delete data.id;
    const url = `${this.apiEndpoint}/api/banco/`;
    return await this.http.post<BancosClass>(url, data).toPromise();
  }

  async listar_bancos(): Promise<BancosClass[]> {
    const url = `${this.apiEndpoint}/api/banco/`;
    return await this.http.get<BancosClass[]>(url).toPromise();
  }

  async listar_bancos_filtrados(filter: object): Promise<BancosClass[]> {
    const url = `${this.apiEndpoint}/api/banco/filter/`;
    return await this.http.post<BancosClass[]>(url, filter).toPromise();
  }

  async listar_banco(id: number): Promise<BancosClass> {
    const url = `${this.apiEndpoint}/api/banco/` + id;
    return await this.http.get<BancosClass>(url).toPromise();
  }

  async actualizar_banco(data: BancosClass): Promise<BancosClass> {
    const url = `${this.apiEndpoint}/api/banco/` + data.id;
    delete data.id;
    return await this.http.patch<BancosClass>(url, data).toPromise();
  }

  async cambiar_estado(id: number, state: number): Promise<BancosClass> {
    const url = `${this.apiEndpoint}/api/banco/` + id + '/' + state;
    return await this.http.patch<BancosClass>(url, {}).toPromise();
  }

  async reporteLitadoGeneralPdf(data: any): Promise<any> {
    const that = this;
    return new Promise(async (resolve, reject) => {
      that.pdfMakeService.convertImgToBase64URL(that.AppBaseUrl + '/assets/img/pos/logo.png', async function (base64Img) {
        let data_impri: any = [
          [{
            text: 'CODIGO',
            style: 'tableHeader'
          }, {
            text: 'NIT',
            style: 'tableHeader'
          },
          {
            text: 'NOMBRE',
            style: 'tableHeader'
          }]
        ];

        const res = await that.listar_bancos_filtrados(data).then(result => result);
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          data_impri.push([
            {
              text: element.codigo,
              alignment: 'left'
            }, {
              text: element.nit,
              alignment: 'left'
            },
            {
              text: element.nombre,
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
              text: 'LISTADO DE BANCOS',
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
}
