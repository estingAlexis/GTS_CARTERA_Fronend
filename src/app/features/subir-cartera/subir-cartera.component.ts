import { Component, OnInit, ɵConsole, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CarteraService } from '../cartera.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-subir-cartera',
    templateUrl: './subir-cartera.component.html',
    styleUrls: ['./subir-cartera.component.css']
})
export class SubirCarteraComponent {
    uploadUrl: string;
    uploadedFiles: any[] = [];
    constructor(
        private titleService: Title,
        private _CarteraService: CarteraService,
        private injector: Injector,
        private http: HttpClient
    ) {
        this.titleService.setTitle('GTS CARTERA');
        this.uploadUrl = 'http://localhost:8009/input';
    }

    myUploader(event): void {
        console.log('My File upload', event);
        if (event.files.length == 0) {
            console.log('No file selected.');
            return;
        }

        var fileToUpload = event.files[0];
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("nombre", event.files[0].name);
        this.http
            .post(this.uploadUrl, input)
            .subscribe(res => {
            console.log(res);
            });
    }

    public onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        console.log(event.files);
    }


}
