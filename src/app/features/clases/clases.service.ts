import { Injectable } from '@angular/core';
import { APP } from '@app/constants';
import { HttpClient } from '@angular/common/http';
import { ClasesClass } from './clases.class'
import { PdfMakeService, dataPdfMake, dataLogPdf } from '@app/core/pdfmake.config';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  apiEndpoint = APP.ApiEndpoint;
  AppBaseUrl = APP.AppBaseUrl;
  constructor(
    private http: HttpClient,
    private pdfMakeService: PdfMakeService
  ) { }

  async guardar_clase(data: ClasesClass): Promise<ClasesClass> {
    delete data.id;
    const url = `${this.apiEndpoint}/api/clases/`;
    return await this.http.post<ClasesClass>(url, data).toPromise();
  }
  async listar_clases(): Promise<ClasesClass[]> {
    const url = `${this.apiEndpoint}/api/clases/`;
    return await this.http.get<ClasesClass[]>(url).toPromise();
  }
  async listar_clases_filtrados(filter: object): Promise<ClasesClass[]> {
    const url = `${this.apiEndpoint}/api/clases/filter/`;
    return await this.http.post<ClasesClass[]>(url, filter).toPromise();
  }
  async listar_clase(id: number): Promise<ClasesClass> {
    const url = `${this.apiEndpoint}/api/clases/` + id;
    return await this.http.get<ClasesClass>(url).toPromise();
  }
  async cambiar_estado(id: number, state: number): Promise<ClasesClass> {
    const url = `${this.apiEndpoint}/api/clases/` + id + '/' + state;
    return await this.http.patch<ClasesClass>(url, {}).toPromise();
  }
  async actualizar_clase(data: ClasesClass): Promise<ClasesClass> {
    const url = `${this.apiEndpoint}/api/clases/` + data.id;
    delete data.id;
    return await this.http.patch<ClasesClass>(url, data).toPromise();
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
            text: 'NOMBRES',
            style: 'tableHeader'
          },
          ]
        ];

        const res = await that.listar_clases_filtrados(data).then(result => result);
        for (let i = 0; i < res.length; i++) {
          const element = res[i];
          data_impri.push([
            {
              text: element.codigo,
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
              text: 'LISTADO DE CLASES DE PRODUCTO',
              style: 'header'
            },
            {
              style: 'tableDetalle',
              layout: dataPdfMake.line_layout,
              fontSize: 5,
              table: {
                headerRows: 1,
                fontSize: 5,
                widths: ['*', '*'],
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
