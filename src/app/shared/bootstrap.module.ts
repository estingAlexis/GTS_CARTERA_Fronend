import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
    ModalModule,
    ButtonsModule,
    TooltipModule,
    BsDropdownModule,
    ProgressbarModule,
    AlertModule,
    TabsModule,
    AccordionModule,
    CarouselModule,
    PopoverModule
} from "ngx-bootstrap";
import { NgxSmartModalModule } from 'ngx-smart-modal';


@NgModule({
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        CarouselModule.forRoot(),
        PopoverModule.forRoot(),
        NgxSmartModalModule.forRoot()
    ],
    exports: [
        ModalModule,
        ButtonsModule,
        TooltipModule,
        BsDropdownModule,
        ProgressbarModule,
        AlertModule,
        TabsModule,
        AccordionModule,
        CarouselModule,
        NgxSmartModalModule
    ],
    declarations: []
})
export class BootstrapModule { }
