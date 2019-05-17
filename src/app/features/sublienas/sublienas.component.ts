import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-sublienas',
  templateUrl: './sublienas.component.html',
  styleUrls: ['./sublienas.component.css']
})
export class SublienasComponent implements OnInit {

  accion_formulario: number;

  constructor() {
    this.accion_formulario = 0;
  }

  ngOnInit() {
  }

  newSublineas() {
    this.even_table_sublineas({ tipo: 1 });
  }

  even_table_sublineas(event) {

    switch (event.tipo) {

      case 1:
        this.accion_formulario = event.tipo;
        break;
    }
  }
}
