import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.component.html',
  styleUrls: ['./tarjeta-usuario.component.css']
})
export class TarjetaUsuarioComponent implements OnInit {

  @Input()
  usuario ={nombre:"",vivo:true}
  @Input()
  color =""
  @Input()
  imagen=""


  constructor() { }

  ngOnInit(): void {
  }



}
