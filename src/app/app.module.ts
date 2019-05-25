import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SnotifyModule, ToastDefaults, SnotifyService } from "ng-snotify";

export const ToastConfig = Object.assign({}, ToastDefaults);
// ToastConfig.toast.backdrop = 0.5;
ToastConfig.toast.titleMaxLength = 25
ToastConfig.toast.bodyMaxLength = 250

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        SnotifyModule
    ],
    providers: [
        { provide: 'SnotifyToastConfig', useValue: ToastConfig},
        SnotifyService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
