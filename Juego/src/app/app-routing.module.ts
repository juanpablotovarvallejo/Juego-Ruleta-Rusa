import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RutaBienvenidoComponent} from "./rutas/ruta-bienvenido/ruta-bienvenido.component";
import {RutaSalaComponent} from "./rutas/ruta-sala/ruta-sala.component";
import {RutaSalaEsperaComponent} from "./rutas/ruta-sala-espera/ruta-sala-espera.component";

const routes: Routes = [
  {
    path: 'sala/:idSala/:nombreUsuario',
    component: RutaSalaComponent,
  },
  {
    path: 'salaEspera/:idSala/:nombreUsuario',
    component: RutaSalaEsperaComponent,
  },
  {
    path: '**',
    component: RutaBienvenidoComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
