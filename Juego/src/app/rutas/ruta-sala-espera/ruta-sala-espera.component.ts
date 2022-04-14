import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketsService} from "../../../services/websockets.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-ruta-sala-espera',
  templateUrl: './ruta-sala-espera.component.html',
  styleUrls: ['./ruta-sala-espera.component.css']
})
export class RutaSalaEsperaComponent implements OnInit, OnDestroy {

  nombre=''
  salaId=''
  arregloSuscripciones:Subscription[] = [];
  host = false
  usuarios: [] =[];
  colores =[
    '#20c868',
    '#1574cd',
    '#8943b0',
    '#ed51aa',
    '#f22631',
    '#fe9400'
  ]
  imagenes =[
    "https://img.icons8.com/color/35/000000/borg-head.png",
    "https://img.icons8.com/color/35/000000/human-head.png",
    "https://img.icons8.com/color/35/000000/andorian-head.png",
    "https://img.icons8.com/color/35/000000/roman-helmet.png",
    "https://img.icons8.com/color/35/000000/lemur.png",
    "https://img.icons8.com/color/35/000000/cat-head.png",
    "https://img.icons8.com/color/35/000000/ninja-head.png",
    "https://img.icons8.com/color/35/000000/venom-head.png"
  ]

  constructor(
    public readonly activatedRoute : ActivatedRoute,
    public readonly websocketsService: WebsocketsService,
    public readonly router: Router
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .subscribe({
        next:(parametrosDeRuta)=>{
          const salaId = parametrosDeRuta['idSala'];
          const nombre= parametrosDeRuta['nombreUsuario'];
          this.nombre=nombre;
          this.salaId=salaId;
          this.logicaSalas(this.salaId,this.nombre)
        }
      })
  }
  logicaSalas(salaId:string, nombre:string){
    this.desSuscribirse();
    const respEscucharEventoUnirseSala =
      this.websocketsService.escucharEventoUnirseSala()
        .subscribe({
          next:(data)=>{
            this.usuarios=data as []
          },
          error:(error)=>{
            console.error({error})
          }
        });
    const respEscucharEventoPartida =
      this.websocketsService.escucharEventoObtenerDatos()
        .subscribe({
          next:(data)=>{
            // @ts-ignore
            this.usuarios=data[0]
            // @ts-ignore
            if(this.usuarios.length===1){
              this.host=true
            }
          },
          error:(error)=>{
            console.error({error})
          }
        });
    const respJugar =
      this.websocketsService.escucharEventoJugar()
        .subscribe({
          next:()=>{
            this.router.navigate(['/sala/'+this.salaId+"/"+this.nombre])
          },
          error:(error)=>{
            console.error({error})
          }
        });
    this.arregloSuscripciones.push(respEscucharEventoUnirseSala)
    this.arregloSuscripciones.push(respEscucharEventoPartida)
    this.arregloSuscripciones.push(respJugar)
    this.websocketsService.ejecutarEventoObtenerDatos(+this.salaId,this.nombre)
  }

  desSuscribirse(){
    this.arregloSuscripciones.forEach(
      (suscripcion:Subscription)=>{
        suscripcion.unsubscribe();
      }
    );
    this.arregloSuscripciones = [];
  }

  abandonarSala(){
    this.websocketsService.ejecutarEventoAbandonarSala(+this.salaId,this.nombre)
    this.router.navigate(['/'])
  }

  jugar(){
    this.websocketsService.ejecutarEventoJugar(+this.salaId)
  }

  ngOnDestroy() {
    console.log("Adios")
  }

}
