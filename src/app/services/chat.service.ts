import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private wsService: WebSocketService) {}

  sendMessage(mensaje: string) {
    const payload = {
      de: this.wsService.usuario?.nombre,
      cuerpo: mensaje,
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }

  getPrivateMessages() {
    return this.wsService.listen('mensaje-privado');
  }

  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos') as Observable<Usuario[]>;
  }

  emitirPeticionUsuariosActivos() {
    return this.wsService.emit('obtener-usuarios');
  }
}
