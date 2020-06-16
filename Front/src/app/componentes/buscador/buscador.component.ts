import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { InstrumentosService } from 'src/app/servicios/instrumentos.service'
import { Instrumento } from '../../model/Instrumento';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  instrumentoBusqueda: any = [];
  termino:string;
  public instrumentoArray: Instrumento[];

  constructor(private activatedRoute: ActivatedRoute, private servicioInstrumento: InstrumentosService, private router:Router) { }

  ngOnInit(): void {
    this.servicioInstrumento.getAll().subscribe((data: Instrumento[]) => {
      if(data){
        this.instrumentoArray = data;
        console.log(this.instrumentoArray)
        this.getInstrumentosBuscados();
      }
      
    });
    
  }

  getInstrumentosBuscados() {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params['termino']);
      this.termino = params['termino'];
      this.instrumentoBusqueda = this.servicioInstrumento.buscarInstrumento(params['termino'], this.instrumentoArray);
      
    });
    
  }

  public verInstrumento(idx:string){ 
    this.router.navigate(['/detalle',idx]) 
  }

}
