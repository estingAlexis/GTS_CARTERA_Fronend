import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
@Component({
  selector: 'sa-programas-table',
  templateUrl: './programas-table.component.html',
  styleUrls: ['./programas-table.component.css']
})
export class ProgramasTableComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;
  programas: any;
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
  constructor() { }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
}

}
