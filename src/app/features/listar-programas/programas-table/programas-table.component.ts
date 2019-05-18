import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
@Component({
  selector: 'sa-programas-table',
  templateUrl: './programas-table.component.html',
  styleUrls: ['./programas-table.component.css']
})
export class ProgramasTableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;
  programas: any;
  public sv: any;
  fileName: string = 'SheetJS.xlsx';
  data = [
    {id: 1, nombre: 'maria'},
    {id: 2, nombre: 'pedro'},
    {id: 3, nombre: 'juan'}
  ]
  /*
  @Input() set state(state: number) {
      this.stateFilter = state;
      this.listar_datos();
  }
  @Input() set cambio(cambio: number) {
      if (cambio > 1) {
          this.listar_datos();
      }
  }
  @Output() close = new EventEmitter();
*/
  constructor(
    private snotifyService: SnotifyService
  ) {
    this.dtOptions = {
      buttons: [
        'copy',
        'print',
        'excel',
        {
          text: 'Some button',
          key: '1',
          action: function (e, dt, node, config) {
            alert('This is an accion Button');
          }
        }
      ],
      pagingType: 'full_numbers',
      language: DataSpanidhDatatable,
      dom: 'Bfrtip'
    };
    this.sv = '';
  }
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
}
