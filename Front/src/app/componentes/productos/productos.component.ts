import { Component, OnInit } from '@angular/core';
import { InstrumentosService } from '../../servicios/instrumentos.service';
import { Router } from '@angular/router';
import { Instrumento } from '../../model/Instrumento';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private router:Router, private servicioInstrumento:InstrumentosService) { }

  public instrumentoArray: Instrumento[];

  public instrumento: Instrumento = {
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

  public verInstrumento(idx:string){
    this.router.navigate(['/detalle',idx]);
  }

}
