import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: [],
})
export class MensajesComponent implements OnInit {
  constructor(public wsService: WebSocketService) {}

  ngOnInit(): void {}
}
