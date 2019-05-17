import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainLayoutComponent } from "./shared/layout/app-layouts/main-layout.component";
import { AuthLayoutComponent } from "./shared/layout/app-layouts/auth-layout.component";

const routes: Routes = [
    {
        path: "admin",
        component: MainLayoutComponent,
        loadChildren: "./features/features.module#FeaturesModule"
    }, {
        path: "auth",
        component: AuthLayoutComponent,
        loadChildren: "./auth/auth.module#AuthModule"
    },
    { path: "**", redirectTo: "/admin/home" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
