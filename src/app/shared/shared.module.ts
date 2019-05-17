import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SmartadminLayoutModule } from "./layout";

import { UtilsModule } from "./utils/utils.module";
import { BootstrapModule } from "@app/shared/bootstrap.module";
import { PipesModule } from "./pipes/pipes.module";
import { SmartadminFormsLiteModule } from "./forms/smartadmin-forms-lite.module";
import { SmartadminWidgetsModule } from "./widgets/smartadmin-widgets.module";
import { SmartProgressbarModule } from "./ui/smart-progressbar/smart-progressbar.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,

        SmartadminLayoutModule,
        BootstrapModule
    ],
    providers: [],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,

        SmartadminLayoutModule,
        BootstrapModule,

        UtilsModule,
        PipesModule,

        SmartadminFormsLiteModule,
        SmartProgressbarModule,

        SmartadminWidgetsModule
    ]
})
export class SharedModule { }
