import { Component, OnInit, ViewChild, ElementRef, Input, Host } from '@angular/core';
import { InstrumentosService } from '../../servicios/instrumentos.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TablaComponent } from '../tabla/tabla.component';
import { Instrumento } from '../../model/Instrumento';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private servicioInstrumento: InstrumentosService, @Host() private tabla: TablaComponent, private formBuilder: FormBuilder ) { }

  @Input() set instrumentoActual(valor) {
    this.onBuild();
    if (valor) {
      this.instrumentoOrignal = valor;
      this.edit = true;
      this.formInstrumento.patchValue({
        id: valor.id,
        instrumento: valor.instrumento,
        marca: valor.marca,
        modelo: valor.modelo,
        imagen: valor.imagen,
        precio: valor.precio,
        costoEnvio: valor.costoEnvio,
        cantidadVendida: valor.cantidadVendida,
        descripcion: valor.descripcion,
      });
    }
  }
  
  @ViewChild('XXXX',{static: true}) btnClose: ElementRef;

  public formInstrumento: FormGroup;
  public instrumentoOrignal: any;
  public edit = false;
  public isError = false;
  

  ngOnInit() {
    this.onBuild();
  }

  onBuild() { // Armo la base del formulario
    this.formInstrumento = this.formBuilder.group({
      id: new FormControl(0),
      instrumento: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      imagen: new FormControl(''),
      image: new FormControl(null, [Validators.required]),
      precio: new FormControl('', Validators.required),
      costoEnvio: new FormControl('', Validators.required),
      cantidadVendida: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required)
    });
  }


  onSave(formInstrumento: FormGroup): void { //verifico que operacion voy hacer
    if (formInstrumento.invalid) {
      this.isError = true;
    } else {
      if (formInstrumento.value.id === 0) {
        // Agregar
        this.add(formInstrumento.value);
      } else {
        this.update(formInstrumento.value);
      }
    }
  }

  add(instrumento: Instrumento) {
    instrumento.imagen = this.formInstrumento.value.image.name; //guardo el nombre de la imagen que selecione en el objecto que voy a mandar al back

    const formdata = new FormData(); //Con un formData guardo el archivo al back para que se mande despues
    formdata.append('imagen', this.formInstrumento.value.image);
    console.log(formdata.get('imagen'));

    this.servicioInstrumento.post(instrumento).subscribe(
      res => {
        this.tabla.instrumentoArray.push(res);
        this.servicioInstrumento.saveImage(formdata).subscribe(
          res => {
            console.log(res)
          },
          err => {
            alert('Ocurrió un error al agregar el instrumento');
            console.log(err);
          }
        );
      },
      err => {
        alert('Ocurrió un error al agregar el instrumento');
      }
    );
    this.btnClose.nativeElement.click();
  }

  update(instrumento: Instrumento) {
    instrumento.imagen = this.formInstrumento.value.image.name; //guardo el nombre de la imagen que selecione en el objecto que voy a mandar al back

    const id = Number(instrumento.id)

    const formdata = new FormData(); //Con un formData guardo el archivo al back para que se mande despues
    formdata.append('imagen', this.formInstrumento.value.image);
    console.log(formdata.get('imagen'));

    this.servicioInstrumento.put(id, instrumento).subscribe(
      res => {
        alert('El instrumento fue actualizado con éxito');
        const cambio = this.tabla.instrumentoArray.filter( item => item.id !== instrumento.id);
        this.tabla.instrumentoArray = cambio;
        this.tabla.instrumentoArray.unshift(instrumento);

          this.servicioInstrumento.saveImage(formdata).subscribe(
            res => {
              console.log(res)
            },
            err => {
              alert('Ocurrió un error al agregar el instrumento');
              console.log(err);
            }
          );
        
      },
      err => {
        alert('Ocurrió un error al actualizar el instrumento');
        console.log(err);
      }
    );
    this.btnClose.nativeElement.click();
  }

  onClose() { //Hago un reset al formulario
    this.instrumentoActual = {
      id: '',
      instrumento: '',
      marca: '',
      modelo: '',
      imagen: '',
      precio: '',
      costoEnvio: '',
      cantidadVendida: '',
      descripcion: ''
    };
    this.formInstrumento.value.image = '';
    this.isError = false;
  }

  onCloseAlert() {
    this.isError = false;
  }
  

}
