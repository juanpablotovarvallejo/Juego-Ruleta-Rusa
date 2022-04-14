import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class EventosGateway {
  salas = [[], [], [], [], [], [], [], [], []];
  contadores = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  @SubscribeMessage('obtenerDatos')
  obtenerDatos(
    @MessageBody()
    message: { salaId: string; nombre: string },
    @ConnectedSocket()
    socket: Socket,
  ) {
    socket.emit('escucharEventoObtenerDatos', [
      this.salas[+message.salaId],
      this.salas[+message.salaId][this.contadores[+message.salaId]],
    ]);
    return 'ok';
  }

  @SubscribeMessage('unirseSala')
  unirseSala(
    @MessageBody()
    message: { salaId: string; nombre: string },
    @ConnectedSocket()
    socket: Socket,
  ) {
    socket.join(message.salaId);
    this.salas[+message.salaId].push({ nombre: message.nombre, vivo: true });
    socket.broadcast
      .to(message.salaId)
      .emit('escucharEventoUnirseSala', this.salas[+message.salaId]);
    //socket.emit('escucharEventoUnirseSala', this.salas[+message.salaId]);
    return 'ok';
  }

  @SubscribeMessage('jugarEvento')
  jugarEvento(
    @MessageBody()
    message: { salaId: string },
    @ConnectedSocket()
    socket: Socket,
  ) {
    socket.broadcast.to(message.salaId).emit('escucharEventoJugar');
    socket.emit('escucharEventoJugar');
    return 'ok';
  }

  @SubscribeMessage('abandonarSala')
  abandonarSala(
    @MessageBody()
    message: { salaId: string; nombre: string },
    @ConnectedSocket()
    socket: Socket,
  ) {
    this.salas[+message.salaId].splice(
      this.salas[+message.salaId].indexOf(message.nombre),
      1,
    );
    socket.leave(message.salaId);
    socket.broadcast
      .to(message.salaId)
      .emit('escucharEventoUnirseSala', this.salas[+message.salaId]);
    return 'ok';
  }

  @SubscribeMessage('siguienteTurno')
  siguienteTurno(
    @MessageBody()
    message: { salaId: string; usuarios: [] },
    @ConnectedSocket()
    socket: Socket,
  ) {
    this.salas[+message.salaId] = message.usuarios;
    do {
      this.contadores[+message.salaId] =
        (this.contadores[+message.salaId] + 1) %
        this.salas[+message.salaId].length;
    } while (
      this.salas[+message.salaId][this.contadores[+message.salaId]].vivo ===
      false
    );
    socket.emit('escucharEventoObtenerDatos', [
      this.salas[+message.salaId],
      this.salas[+message.salaId][this.contadores[+message.salaId]],
    ]);
    socket.broadcast
      .to(message.salaId)
      .emit('escucharEventoObtenerDatos', [
        this.salas[+message.salaId],
        this.salas[+message.salaId][this.contadores[+message.salaId]],
      ]);
    if (this.jugadoresVivos(+message.salaId) === 1) {
      socket.emit(
        'escucharEventoFinJuego',
        this.salas[+message.salaId][this.contadores[+message.salaId]],
      );
      socket.broadcast
        .to(message.salaId)
        .emit(
          'escucharEventoFinJuego',
          this.salas[+message.salaId][this.contadores[+message.salaId]],
        );
      this.salas[+message.salaId] = [];
      this.contadores[+message.salaId] = 0;
    }
    return 'ok';
  }

  jugadoresVivos(idSala: number) {
    let jugadoresVivos = 0;
    for (const usuario of this.salas[idSala]) {
      if (usuario.vivo === true) {
        jugadoresVivos += 1;
      }
    }
    return jugadoresVivos;
  }
}
