import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private wsService: WebSocketService) {}

  sendMessage(mensaje: string) {
    const payload = {
      de: 'Pedro',
      cuerpo: mensaje,
    };

    this.wsService.emit('mensaje', payload);
  }

  getMessages() {
    return this.wsService.listen('mensaje-nuevo');
  }
}
