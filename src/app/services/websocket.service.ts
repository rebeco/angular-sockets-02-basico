import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../interfaces/usuario.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socketStatus = false;
  public usuario: Usuario | null = null;

  constructor(private socket: Socket, private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: object, callback?: Function) {
    console.log('Emitiendo ', evento);
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    return new Promise<void>((resolve, reject) => {
      const payload = { nombre: nombre };
      const callback = (resp: any) => {
        console.log(resp);
        this.usuario = {
          nombre: nombre,
          id: resp.id,
        };
        this.guardarStorage();
        resolve();
      };

      this.emit('configurar-usuario', payload, callback);
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = { nombre: '' };
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('/');
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.loginWS(this.usuario!.nombre);
    }
  }
}
