import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [],
})
export class ChatComponent implements OnInit, OnDestroy {
  texto: string = '';
  mensajesSubscription: Subscription;
  elemento!: HTMLElement;

  mensajes: any[] = [];

  constructor(private chatService: ChatService) {
    this.mensajesSubscription = this.chatService
      .getMessages()
      .subscribe((msg) => {
        console.log('Escuchando mensajes... ', msg);
        this.mensajes.push(msg);

        // Esto es una guarrería
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });
  }
  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes')!;
  }

  enviar() {
    if (this.texto.trim().length === 0) {
      return; 
    }
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
