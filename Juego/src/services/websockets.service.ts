import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class WebsocketsService {



  constructor(private socket: Socket){
  }

  ejecutarEventoJugar(salaId: number){
    const resp = this.socket.emit('jugarEvento',{
      salaId
    });
  }
  ejecutarEventoObtenerDatos(salaId: number,nombre:string){
    const resp = this.socket.emit('obtenerDatos',{
      nombre,
      salaId
    });
  }
  escucharEventoJugar(){
    return this.socket.fromEvent('escucharEventoJugar')
  }

  ejecutarEventoUnirseSala(salaId: number,nombre: string){
    const resp = this.socket.emit('unirseSala',{
      nombre,
      salaId
    });
  }
  ejecutarEventoAbandonarSala(salaId: number,nombre: string){
    const resp = this.socket.emit('abandonarSala',{
      nombre,
      salaId
    });
  }
  ejecutarEventoSiguienteTurno(salaId: number,usuarios :[{nombre:string,vivo:boolean}]){
    const resp = this.socket.emit('siguienteTurno',{
      usuarios,
      salaId
    });
  }
  escucharEventoUnirseSala(){
    return this.socket.fromEvent('escucharEventoUnirseSala')
  }
  escucharEventoObtenerDatos(){
    return this.socket.fromEvent('escucharEventoObtenerDatos')
  }
  escucharEventoAbandonarSala(){
    return this.socket.fromEvent('escucharEventoAbandonarSala')
  }
  escucharEventoFinJuego(){
    return this.socket.fromEvent('escucharEventoFinJuego')
  }

}
