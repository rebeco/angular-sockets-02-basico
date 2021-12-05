import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WebSocketService } from '../services/websocket.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuard implements CanActivate {
  constructor(private wsSocket: WebSocketService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.wsSocket.usuario) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
