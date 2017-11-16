import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SnackbarService } from '../shared/snackbar.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
        private snackBar: SnackbarService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isAuthenticated.map<boolean, boolean>((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                this.snackBar.open('toast.serverResponse.access_denied', 'toast.close', 1500);
                this.router.navigate(['/login']);
            }
            return isAuthenticated;
        });
    }
}
