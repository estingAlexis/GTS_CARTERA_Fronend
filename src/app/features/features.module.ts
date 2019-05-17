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

import { DescuentosComercialesComponent } from './descuentos-comerciales/descuentos-comerciales.component';
import { DescuentosFormComponent } from './descuentos-comerciales/form/descuentos.form.component';
import { DescuentosTableComponent } from './descuentos-comerciales/table/descuentos.table.component';
import { TableProductoDescuentosComponent } from './descuentos-comerciales/form/table-producto-descuentos/table-producto-descuentos.component';
import { DescuentoService } from './descuentos-comerciales/descuentos.service';

import { BancosComponent } from './bancos/bancos.component';
import { bancosFormComponent } from './bancos/form/bancos.form.component';
import { BancosTableComponent } from './bancos/table/bancos.table.component';
import { BancosService } from './bancos/bancos.service';

import { CobradoresComponent } from './cobradores/cobradores.component';
import { CobradorFormComponent } from './cobradores/form/form.component';
import { CobradorTableComponent } from './cobradores/table/table.component';
import { CobradoresService } from './cobradores/cobradores.service';

import { DepartamentosComponent } from './departamentos/departamentos.component';
import { DepartamentoFormComponent } from './departamentos/form/departamento.form.component';
import { DepartamentoTableComponent } from './departamentos/table/departamento.table.component';
import { DepartamentosService } from './departamentos/departamentos.service';

import { DataTablesModule } from 'angular-datatables';
import { PdfMakeService } from '@app/core/pdfmake.config';
import { TreeviewComponent } from './departamentos/treeview/treeview.component';

import { ClasesComponent } from './clases/clases.component';
import { LineasComponent } from './lineas/lineas.component';
import { FormClaseComponent } from './clases/form-clase/form-clase.component';
import { TableClaseComponent } from './clases/table-clase/table-clase.component';
import { FormLineasComponent } from './lineas/form-lineas/form-lineas.component';
import { TableLineasComponent } from './lineas/table-lineas/table-lineas.component';

import { CuentascontablesFormComponent } from './cuentas-contables/form/cuentas-contables.form.component';
import { CuentasContablesComponent } from './cuentas-contables/cuentas-contables.component';
import { CuentasContService } from './cuentas-contables/cuentas-cont.service';
import { CuentasTableComponent } from './cuentas-contables/table/cuentas.table.component';
import { SublienasComponent } from './sublienas/sublienas.component';
import { SublineasFormComponent } from './sublienas/sublineas.form/sublineas.form.component';
import { SubirCarteraComponent } from './subir-cartera/subir-cartera.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {MultiSelectModule} from 'primeng/multiselect';
import { CarteraService } from './cartera.service';
import { ListarProgramasComponent } from './listar-programas/listar-programas.component';
import { ProgramasTableComponent } from './listar-programas/programas-table/programas-table.component';
@NgModule({
    imports: [
        CommonModule,
        featuresRouting,
        SharedModule,
        DataTablesModule,
        TreeViewModule,
        FileUploadModule,
        ToastModule,
        MultiSelectModule
    ],
    declarations: [
        HomeComponent,
        Error404Component,
        SubirCarteraComponent,
        AlmacenComponent, 
        AlmacenTableomponent, 
        AlmacenFormComponent,
        DescuentosComercialesComponent, 
        DescuentosFormComponent, 
        DescuentosTableComponent, 
        TableProductoDescuentosComponent,
        BancosComponent, 
        bancosFormComponent, 
        BancosTableComponent,
        DepartamentosComponent, 
        TreeviewComponent, 
        DepartamentoFormComponent, 
        DepartamentoTableComponent,
        CobradoresComponent, 
        CobradorFormComponent, 
        CobradorTableComponent, 
        CuentasContablesComponent, 
        ClasesComponent, 
        LineasComponent, 
        FormClaseComponent, 
        TableClaseComponent, 
        FormLineasComponent, 
        TableLineasComponent, 
        CuentascontablesFormComponent, 
        CuentasTableComponent, 
        SublienasComponent, 
        SublineasFormComponent, 
        ListarProgramasComponent, 
        ProgramasTableComponent
    ],
    providers: [
        PdfMakeService,
        AlmacenService,
        DescuentoService,
        BancosService,
        CobradoresService,
        DepartamentosService,
        CuentasContService,
        CarteraService
    ]
})
export class FeaturesModule { }
