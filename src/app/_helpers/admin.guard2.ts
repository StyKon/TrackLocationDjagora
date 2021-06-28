import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard2 implements CanActivate {

  constructor(private auth: AuthService, private router: Router ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {
      if (this.auth.isLoggedIn()) {
        this.router.navigate(['']);
        return true;
      } else {
        return false;
      }
  }
}
