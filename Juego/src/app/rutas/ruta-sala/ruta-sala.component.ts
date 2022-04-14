import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, observable, of, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {WebsocketsService} from "../../../services/websockets.service";

@Component({
  selector: 'app-ruta-sala',
  templateUrl: './ruta-sala.component.html',
  styleUrls: ['./ruta-sala.component.css']
})
export class RutaSalaComponent implements OnInit {

  nombre=''
  salaId=''
  arregloSuscripciones:Subscription[] = [];
  displayBasic: boolean = false
  usuarios: [{nombre:string,vivo:boolean}] =[{nombre:"",vivo:true}];
  numero=Math.round(Math.random() * (6 - 1) + 1)
  turno:{nombre:string,vivo:boolean} = {nombre:"",vivo:true} ;
  btnDisparar=true
  modalVives=false
  modalMueres= false
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
    const respEscucharEventoPartida =
      this.websocketsService.escucharEventoObtenerDatos()
        .subscribe({
          next:(data)=>{
            // @ts-ignore
            this.usuarios=data[0]
            // @ts-ignore
            this.turno=data[1]
            this.btnDisparar=this.nombre!==this.turno.nombre
          },
          error:(error)=>{
            console.error({error})
          }
        });
    const respEscucharEventoFinJuego =
      this.websocketsService.escucharEventoFinJuego()
        .subscribe({
          next:(data)=>{
            this.btnDisparar=true
            this.displayBasic=true
            // if(this.modalMueres===false){
            //   this.displayBasic=true
            // }else{
            //   modal$=this.modalMueres
            //   modal.subscribe((valor)=>{
            //     if(valor===false){
            //       this.displayBasic=true
            //     }
            //   })
            // }
          },
          error:(error)=>{
            console.error({error})
          }
        });
    this.arregloSuscripciones.push(respEscucharEventoPartida)
    this.arregloSuscripciones.push(respEscucharEventoFinJuego)
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

  disparar(){
    if(Math.round(Math.random() * (6 - 1) + 1)===this.numero){
      for (let usuario of this.usuarios){
        if(usuario.nombre===this.nombre){
          usuario.vivo=false
        }
      }
      this.websocketsService.ejecutarEventoSiguienteTurno(+this.salaId,this.usuarios)
      this.modalMueres=true
    }else{
      this.websocketsService.ejecutarEventoSiguienteTurno(+this.salaId,this.usuarios)
      this.modalVives=true
    }

  }

  ngOnDestroy() {
    console.log("Adios")
  }

  obtenerPerfil(){
    let posicion=0
    this.usuarios.forEach((value,index)=>{
      if(value.nombre===this.turno.nombre){
        posicion = index
      }
    })
    return posicion
  }

  regresarInicio(){
    this.websocketsService.ejecutarEventoAbandonarSala(+this.salaId,this.nombre)
    this.router.navigate(['/'])
  }

}
