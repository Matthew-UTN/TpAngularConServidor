import { Injectable } from '@angular/core';
import { Instrumento } from '../model/Instrumento';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InstrumentosService extends CommonService<Instrumento>{

  public instrumentosFile: Instrumento[];

  constructor(public http : HttpClient) {
    super(http);
    this.baseUrl = "http://localhost:9001/api/v1/instrumentos/";
  }

   public selectedInstrumento: Instrumento = {
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
   
  public buscarInstrumento(termino:string, entity: Instrumento[]):any[]{

    this.instrumentosFile = entity;

    console.log(this.instrumentosFile)

    let instrumentoArray:any[]=[];
    termino = termino.toLowerCase();

    for(let instrumento of this.instrumentosFile){
      let nombre = instrumento.instrumento.toLowerCase();
      if(nombre.indexOf(termino)>=0){
        instrumentoArray.push(instrumento);
      }
    }
    return instrumentoArray;
  }

  saveImage(imagen: any) {
    return this.http.post(this.baseUrl + "uploadImg", imagen,{responseType:'text'});
  }
  
}