import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {WebsocketsService} from "../../../services/websockets.service";

@Component({
  selector: 'app-ruta-bienvenido',
  templateUrl: './ruta-bienvenido.component.html',
  styleUrls: ['./ruta-bienvenido.component.css']
})
export class RutaBienvenidoComponent implements OnInit {

  salaId=0
  nombre=""

  salas = [
    {numero:1, color: '#20c868'},
    {numero:2, color: '#1574cd'},
    {numero:3, color: '#8943b0'},
    {numero:4, color: '#ed51aa'},
    {numero:5, color: '#f22631'},
    {numero:6, color: '#fe9400'},
    {numero:7, color: '#20c868'},
    {numero:8, color: '#1574cd'},
    {numero:9, color: '#8943b0'},
  ]
  constructor(private readonly router:Router,
              private readonly webSocketService:WebsocketsService) { }

  ngOnInit(): void {
  }

  setId(idSala:number){
    this.salaId=idSala
  }

  continuar(){
    this.webSocketService.ejecutarEventoUnirseSala(+this.salaId,this.nombre)
    this.router.navigate(['/salaEspera/'+this.salaId+'/'+this.nombre])

  }
}
