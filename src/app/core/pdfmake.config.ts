import { Injectable } from "@angular/core";

import * as moment from 'moment';
moment.locale('es')
declare var pdfMake:any;

@Injectable()
export class PdfMakeService {
  public convertImgToBase64URL(url, callback, outputFormat) {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        let canvas: any = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
  }
  
}

export function downloadPdfMake(docDefinition){
  pdfMake.createPdf(docDefinition).download();
}

export function openPdfMake(docDefinition){
  pdfMake.createPdf(docDefinition).open();
}

export const dataLogPdf = {
    style: 'tableLog',
    layout:null,
    table: {
        widths: [62, 80, 62, 'auto', 62, '*'],
        body: [
            [{
                text: 'USUARIO'
            }, {
                text: ''
            }, {
                text: 'FECHA'
            }, {
                text: moment().format('LLL')
            }, {
                text: 'EMPRESA'
            }, {
                text: ''
            }]
        ]
    }
}

export const dataPdfMake = {
  line_layout : {
      hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
      },
      vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
      },
      hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
      },
      vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
      },
  },
  styles : {
      header: {
          fontSize: 16,
          bold: true,
          color: 'black',
          alignment: 'right',
          margin: [0, -30, 10, 30]
      },
      superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 16,
      },
      tableInfo: {
          margin: [0, 0, 0, 0],
          bold: false,
          fontSize: 8,
          color: 'black'
      },
      tableLog: {
          margin: [0, 10, 0, 0],
          bold: false,
          fontSize: 6,
          color: 'black'
      },
      tableDetalle: {
          margin: [0, 5, 0, 0],
          bold: false,
          fontSize: 8,
          color: 'black'
      },
      tableHeader: {
          bold: true,
          fillColor: '#ffffff',
          fontSize: 8,
          italics: true,
          color: 'black'
      },
      tablesubHeader: {
          bold: true,
          fontSize: 8,
          color: 'black'
      },
      tablesubConsol: {
          bold: true,
          fontSize: 8,
          italics: true,
          color: 'black'
      },
      subdescip: {
          bold: false,
          fontSize: 8,
          color: 'black'
      },
      tableTitle: {
          bold: true,
          fontSize: 8,
          alignment: 'center',
          color: 'black'
      },
      tableSubinfo: {
          bold: false,
          fontSize: 8,
          alignment: 'right',
          color: 'black'
      }
  }
}