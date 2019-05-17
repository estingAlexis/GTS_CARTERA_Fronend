import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataSpanidhDatatable } from '@app/constants';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-table-producto-descuentos',
  templateUrl: './table-producto-descuentos.component.html',
  styleUrls: ['./table-producto-descuentos.component.css']
})
export class TableProductoDescuentosComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  stateFilter: number;

  constructor(
    private snotifyService: SnotifyService
  ) { 
    this.dtOptions = {
        pagingType: 'full_numbers',
        language: DataSpanidhDatatable
    };
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
      this.dtTrigger.next();
  }
  rerenderTable(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
      });
  }

}
