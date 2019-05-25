import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
import { CarteraService } from '@app/features/cartera.service';
import { defineBase } from '@angular/core/src/render3';
declare var $:any;
@Component({
  selector: 'sa-programas-table',
  templateUrl: './programas-table.component.html',
  styleUrls: ['./programas-table.component.css']
})
export class ProgramasTableComponent implements OnInit {
  @ViewChild(DataTableDirective)
  @Output() listar = new EventEmitter();
  @Input() text: string;
  @Input() set data(data: any) {
    this.info = data;
  }
  p: number = 1;
  public info:any;
  public list: any[] = [];
  dtElement: DataTableDirective;
  dtOptions:  DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;
  programas: any;
  public sv: any;
  cols: any[];
  public prog: number;
  constructor(
    private snotifyService: SnotifyService,
    private _CarteraService: CarteraService,
  ) {
    this.cols = [
      { field: 'referencia_catastral', header: 'Ref Catastral' },
      { field: 'nit_cedula', header: 'NIT/Cedula' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'vigencia', header: 'Vigencia' },
      { field: 'avaluo', header: 'Avalúo' },
      { field: 'predial', header: 'Predial' },
      { field: 'valor', header: 'Valor' }
  ];
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  public addToList(data: {}){
    this.list.push(data);
    console.log(this.list);
  }
  public listar_Programas(){
    console.log(this.prog);
    this.listar.emit(this.prog);
  }
  public selectAll(){}
}
