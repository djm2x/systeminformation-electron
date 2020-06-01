import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuard implements CanActivate {

  constructor(private session: SessionService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Si pas authentifier alors aller sous /auth sachant que le router identifie 
    // /auth comme /auth/login
    
    if (!this.session.isSignedIn) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
