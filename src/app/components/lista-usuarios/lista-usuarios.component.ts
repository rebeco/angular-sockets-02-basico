import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styles: [],
})
export class ListaUsuariosComponent implements OnInit {
  usuariosActivos!: Observable<Usuario[]>;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.emitirPeticionUsuariosActivos();
    this.usuariosActivos = this.chatService.getUsuariosActivos();
  }
}
