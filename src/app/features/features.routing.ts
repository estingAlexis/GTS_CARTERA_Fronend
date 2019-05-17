import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ModuleWithProviders } from "@angular/core";
import { Error404Component } from '@app/shared/layout/error404/error404.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { DescuentosComercialesComponent } from './descuentos-comerciales/descuentos-comerciales.component';
import { BancosComponent } from './bancos/bancos.component';
import { CobradoresComponent } from './cobradores/cobradores.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { CuentasContablesComponent } from './cuentas-contables/cuentas-contables.component';
import { SublienasComponent } from './sublienas/sublienas.component';
import { SubirCarteraComponent } from './subir-cartera/subir-cartera.component';
import { ListarProgramasComponent } from './listar-programas/listar-programas.component';

export const featuresRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: { pageTitle: 'Home' }
    }, {
        path: 'almacenes',
        component: AlmacenComponent,
        data: { pageTitle: 'Permisos' },
    }, {
        path: 'subir-cartera',
        component: SubirCarteraComponent,
        data: { pageTitle: 'Subir Cartera' },
    }, {
        path: 'listar-programas',
        component: ListarProgramasComponent,
        data: { pageTitle: 'Listar Programas' },
    }, {
        path: 'descuentos-comerciales',
        component: DescuentosComercialesComponent,
        data: { pageTitle: 'Descuentos-comerciales' },
    }, {
        path: 'bancos',
        component: BancosComponent,
        data: { pageTitle: 'Bancos' },
    }, {
        path: 'cobradores',
        component: CobradoresComponent,
        data: { pageTitle: 'Cobradores' },
    }, {
        path: 'departamentos',
        component: DepartamentosComponent,
        data: { pageTitle: 'Departmentos' },
    }, 
    {
        path: 'cuentas-contables',
        component: CuentasContablesComponent,
        data: { pageTitle: 'Cuentas-contables' },
    },
    {
        path: 'sublineas',
        component: SublienasComponent,
        data: { pageTitle: 'Sublineas' },
    },
    {
        path: "404",
        component: Error404Component
    },
    { path: "**", redirectTo: "/admin/404" }
];

export const featuresRouting: ModuleWithProviders = RouterModule.forChild(featuresRoutes);

