import { Injectable } from '@angular/core';
import { APP } from '@app/constants';
import { HttpClient } from '@angular/common/http';
import { CuentasContablesClass } from './cuentas-contables.class';
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';
import { DataReportDto, dataExcelNode } from '@app/core/excelnode.config';

@Injectable({
  providedIn: 'root'
})
export class CuentasContService {

  apiEndpoint = APP.ApiEndpoint;
  AppBaseUrl = APP.AppBaseUrl;

  constructor(
    private http: HttpClient,
    private pdfMakeService: PdfMakeService
  ) { }

  async guardar_cuenta(data: CuentasContablesClass): Promise<CuentasContablesClass> {
    delete data.id;
    const url = `${this.apiEndpoint}/api/cuentasc/`;
    return await this.http.post<CuentasContablesClass>(url, data).toPromise();
  }

  async listar_cuentas(): Promise<CuentasContablesClass[]> {
    const url = `${this.apiEndpoint}/api/cuentasc/`;
    return await this.http.get<CuentasContablesClass[]>(url).toPromise();
  }

  async listar_cuentas_filtradas(filter: object): Promise<CuentasContablesClass[]> {
    const url = `${this.apiEndpoint}/api/cuentasc/filter/`;
    return await this.http.post<CuentasContablesClass[]>(url, filter).toPromise();
  }

  async listar_cuenta(id: number): Promise<CuentasContablesClass> {
    const url = `${this.apiEndpoint}/api/cuentasc/` + id;
    return await this.http.get<CuentasContablesClass>(url).toPromise();
  }

  async actualizar_cuenta(data: CuentasContablesClass): Promise<CuentasContablesClass> {
    const url = `${this.apiEndpoint}/api/cuentasc/` + data.id;
    delete data.id;
    return await this.http.patch<CuentasContablesClass>(url, data).toPromise();
  }

  async cambiar_estado(id: number, state: number): Promise<CuentasContablesClass> {
    const url = `${this.apiEndpoint}/api/cuentasc/` + id + '/' + state;
    return await this.http.patch<CuentasContablesClass>(url, {}).toPromise();
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
            text: 'NOMBRE',
            style: 'tableHeader'
          },
          {
            text: 'NIVEL',
            style: 'tableHeader'
          },
          {
            text: 'NATURALEZA',
            style: 'tableHeader'
          }
          ]
        ];

        const res = await that.listar_cuentas_filtradas(data).then(result => result);
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          data_impri.push([
            {
              text: element.codigo,
              alignment: 'left'
            }, {
              text: element.nombre,
              alignment: 'left'
            },
            {
              text: element.nivel,
              alignment: 'right'
            },
            {
              text: element.naturaleza,
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
              text: 'LISTADO DE CUENTAS CONTABLES',
              style: 'header'
            },
            {
              style: 'tableDetalle',
              layout: dataPdfMake.line_layout,
              fontSize: 5,
              table: {
                headerRows: 1,
                fontSize: 5,
                widths: ['*', '*', '*', '*'],
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
