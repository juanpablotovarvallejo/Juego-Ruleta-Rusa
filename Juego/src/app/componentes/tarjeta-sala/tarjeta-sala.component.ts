import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WebsocketsService} from "../../../services/websockets.service";

@Component({
  selector: 'app-tarjeta-sala',
  templateUrl: './tarjeta-sala.component.html',
  styleUrls: ['./tarjeta-sala.component.css']
})
export class TarjetaSalaComponent implements OnInit {
  @Input()
  salaId : number = 0
  @Input()
  color: string =""
  nombre=""
  constructor(private readonly router:Router,
              private readonly websocketsService:WebsocketsService) { }

  ngOnInit(): void {
  }


}
