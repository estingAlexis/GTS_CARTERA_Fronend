import { Injectable } from '@angular/core';
import { APP } from '@app/constants';
import { HttpClient } from '@angular/common/http';
import { CobradoresClass } from './cobradores.class';
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';
import { DataReportDto, dataExcelNode } from '@app/core/excelnode.config';

@Injectable({
  providedIn: 'root'
})
export class CobradoresService {
  apiEndpoint = APP.ApiEndpoint;
  AppBaseUrl = APP.AppBaseUrl;
  constructor(
    private http: HttpClient,
    private pdfMakeService: PdfMakeService
  ) { }

  async guardar_cobrador(data: CobradoresClass): Promise<CobradoresClass> {
    delete data.id;
    const url = `${this.apiEndpoint}/api/cobrador/`;
    return await this.http.post<CobradoresClass>(url, data).toPromise();
  }
  async listar_cobradores(): Promise<CobradoresClass[]> {
    const url = `${this.apiEndpoint}/api/cobrador/`;
    return await this.http.get<CobradoresClass[]>(url).toPromise();
  }
  async listar_cobradores_filtrados(filter: object): Promise<CobradoresClass[]> {
    const url = `${this.apiEndpoint}/api/cobrador/filter/`;
    return await this.http.post<CobradoresClass[]>(url, filter).toPromise();
  }
  async listar_cobrador(id: number): Promise<CobradoresClass> {
    const url = `${this.apiEndpoint}/api/cobrador/` + id;
    return await this.http.get<CobradoresClass>(url).toPromise();
  }
  async cambiar_estado(id: number, state: number): Promise<CobradoresClass> {
    const url = `${this.apiEndpoint}/api/cobrador/` + id + '/' + state;
    return await this.http.patch<CobradoresClass>(url, {}).toPromise();
  }
  async actualizar_cobrador(data: CobradoresClass): Promise<CobradoresClass> {
    const url = `${this.apiEndpoint}/api/cobrador/` + data.id;
    delete data.id;
    return await this.http.patch<CobradoresClass>(url, data).toPromise();
  }


  async reporteListadoGeneralPdf(data: any): Promise<any> {
    const that = this;
    return new Promise(async (resolve, reject) => {
      that.pdfMakeService.convertImgToBase64URL(that.AppBaseUrl + '/assets/img/pos/logo.png', async function (base64Img) {
        let data_impri: any = [
          [{
            text: 'CODIGO',
            style: 'tableHeader'
          }, {
            text: 'IDENTIFICACION',
            style: 'tableHeader'
          }, {
            text: 'NOMBRES',
            style: 'tableHeader'
          }, {
            text: 'DIRECCION',
            style: 'tableHeader'
          }, {
            text: 'TELEFONO',
            style: 'tableHeader'
          }, {
            text: 'CELULAR',
            style: 'tableHeader'
          }
          ]
        ];

        const res = await that.listar_cobradores_filtrados(data).then(result => result);
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          data_impri.push([
            {
              text: element.codigo,
              alignment: 'left'
            }, {
              text: element.identificacion,
              alignment: 'left'
            }, {
              text: element.nombre,
              alignment: 'left'
            }, {
              text: element.direccion,
              alignment: 'left'
            }, {
              text: element.telefono,
              alignment: 'left'
            }, {
              text: element.celular,
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
              text: 'LISTADO DE COBRADORES',
              style: 'header'
            },
            {
              style: 'tableDetalle',
              layout: dataPdfMake.line_layout,
              fontSize: 5,
              table: {
                headerRows: 1,
                fontSize: 5,
                widths: ['*', '*', '*', '*', '*', '*'],
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
