import { Component, OnInit, ɵConsole, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CarteraService } from '../cartera.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-listar-programas',
    templateUrl: './listar-programas.component.html',
    styleUrls: ['./listar-programas.component.css']
})
export class ListarProgramasComponent {

    constructor(
        private titleService: Title,
        private _CarteraService: CarteraService,
        private injector: Injector,
        private http: HttpClient
    ) {
        this.titleService.setTitle('GTS LISTAR PROGRAMAS');
    }

    onKeydown(event) {
        let num = 1;
        if (event.key === "Enter") {
          console.log(num =+ 1);
        }
      }
}
