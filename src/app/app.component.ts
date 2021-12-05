import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private wsService: WebSocketService,
    private chatService: ChatService
  ) {}
  ngOnInit(): void {
    this.chatService.getPrivateMessages().subscribe((mensaje) => {
      console.log(mensaje);
    });
  }
}
