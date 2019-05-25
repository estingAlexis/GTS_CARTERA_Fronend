import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { SharedModule } from '@app/shared/shared.module';
import { featuresRouting } from './features.routing';
import { Error404Component } from '@app/shared/layout/error404/error404.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';

import { AlmacenComponent } from './almacen/almacen.component';
import { AlmacenTableomponent } from './almacen/table/almacen.table.component';
import { AlmacenFormComponent } from './almacen/form/almacen.form.component';
import { AlmacenService } from './almacen/almacen.service';

import { DataTablesModule } from 'angular-datatables';
import { PdfMakeService } from '@app/core/pdfmake.config';
import { SubirCarteraComponent } from './subir-cartera/subir-cartera.component';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import { ToastrModule } from 'ngx-toastr';
import {MultiSelectModule} from 'primeng/multiselect';
import { CarteraService } from './cartera.service';
import { ListarProgramasComponent } from './listar-programas/listar-programas.component';
import { ProgramasTableComponent } from './listar-programas/programas-table/programas-table.component';
import { FilterPipe } from './filter.pipe';
import { BsDropdownModule } from 'ngx-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
    imports: [
        CommonModule,
        featuresRouting,
        SharedModule,
        DataTablesModule,
        TreeViewModule,
        FileUploadModule,
        MultiSelectModule,
        ToastrModule.forRoot(),
        TableModule,
        BsDropdownModule,
        NgxPaginationModule,
        DropdownModule
    ],
    declarations: [
        HomeComponent,
        Error404Component,
        SubirCarteraComponent,
        AlmacenComponent, 
        AlmacenTableomponent, 
        AlmacenFormComponent,
        ListarProgramasComponent, 
        ProgramasTableComponent, FilterPipe
    ],
    providers: [
        PdfMakeService,
        AlmacenService,
        CarteraService
    ]
})
export class FeaturesModule { }
