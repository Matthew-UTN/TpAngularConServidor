import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Instrumento } from '../../model/Instrumento';
import { InstrumentosService } from '../../servicios/instrumentos.service';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  constructor(private servicioInstrumento:InstrumentosService) { }

  @ViewChild('XXXX',{static: true}) btnClose: ElementRef;

  public instrumentoArray: Instrumento[];
  headElements = ['ID', 'Instrumento', 'Marca', 'Modelo', 'Precio', 'Imagen', 'Costo Envio', 'Cantidad Vendida', 'Descripcion', 'Acciones'];

  public instrumentoActual: Instrumento = {
    id: "",
    instrumento:"",
    marca: "",
    modelo: "",
    imagen: "",
    precio: "",
    costoEnvio: "",
    cantidadVendida: "",
    descripcion: ""
  };

  ngOnInit(): void {
    this.getAllInstrumentos();
  }

  getAllInstrumentos() {
    this.servicioInstrumento.getAll().subscribe((data: Instrumento[]) => {
      if(data){
        this.instrumentoArray = data;
        console.log(this.instrumentoArray)
      }
    });

  }

  onDeleteInstrumento(instrumento: Instrumento){
    var num = parseInt(instrumento.id, 10);
    console.log(instrumento)
    console.log(num)
    const opcion = confirm('¿Desea eliminar este registro?');
    if (opcion === true) {   
      this.servicioInstrumento.delete(num).subscribe(
        res => {
          alert('El registro fue eliminado con éxito');
          const indexInstru = this.instrumentoArray.indexOf(instrumento);
          this.instrumentoArray.splice(indexInstru, 1);
        }
      );
    }
  }

  onPreUpdateInstrumento(instrumentoUpdate: Instrumento){
    console.log(instrumentoUpdate);
    this.instrumentoActual = instrumentoUpdate;
  }

}
