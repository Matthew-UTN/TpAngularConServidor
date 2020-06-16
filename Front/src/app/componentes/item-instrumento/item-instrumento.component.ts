import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Instrumento } from '../../model/Instrumento';

@Component({
  selector: 'app-item-instrumento',
  templateUrl: './item-instrumento.component.html',
  styleUrls: ['./item-instrumento.component.css']
})
export class ItemInstrumentoComponent implements OnInit {
  @Input() instruAux:Instrumento;
  @Input() index:number;

  @Output() instrumentoSeleccionado:EventEmitter<number>;

  constructor() { 
    this.instrumentoSeleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public verInstrumento(){
    this.instrumentoSeleccionado.emit(this.index);
  }

}
