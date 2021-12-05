import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
// url es la dirección del servidor de websockets
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

@NgModule({
  declarations: [AppComponent, FooterComponent, ChatComponent, ListaUsuariosComponent, LoginComponent, MensajesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config), // Configuración a nivel de aplicación de SocketIO
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
