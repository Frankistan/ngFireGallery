import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth.service';
import { SnackbarService } from '../shared/snackbar.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
        private snackBar: SnackbarService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isAuthenticated.map<boolean, boolean>((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.snackBar.open('toast.logged_in', 'X', 1000);
                this.router.navigate(['/images']);
            }
            return !isAuthenticated;
        });
    }
}
