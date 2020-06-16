import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { HomeComponent } from './componentes/home/home.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { ItemInstrumentoComponent } from './componentes/item-instrumento/item-instrumento.component';
import { FileUploadComponent } from './componentes/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapaComponent,
    ProductosComponent,
    HomeComponent,
    ModalComponent,
    DetalleComponent,
    BuscadorComponent,
    TablaComponent,
    ItemInstrumentoComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
