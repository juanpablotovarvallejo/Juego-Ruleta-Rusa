import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaBienvenidoComponent } from './rutas/ruta-bienvenido/ruta-bienvenido.component';
import { TarjetaSalaComponent } from './componentes/tarjeta-sala/tarjeta-sala.component';
import { RutaSalaComponent } from './rutas/ruta-sala/ruta-sala.component';
import { RutaSalaEsperaComponent } from './rutas/ruta-sala-espera/ruta-sala-espera.component';
import {SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";
import { TarjetaUsuarioComponent } from './componentes/tarjeta-usuario/tarjeta-usuario.component';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    RutaBienvenidoComponent,
    TarjetaSalaComponent,
    RutaSalaComponent,
    RutaSalaEsperaComponent,
    TarjetaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot({
      url: 'ws://localhost:8080',
      options: {}
    }),
    FormsModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
