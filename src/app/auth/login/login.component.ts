import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/snackbar.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    loginForm: FormGroup;
    clientKey: string = environment.recaptcha.clientKey;

    constructor(
        public auth: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: SnackbarService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['test@example.com', [Validators.required, Validators.email]],
            password: ['123456', Validators.required],
            recaptcha: [null, Validators.required]
        });
    }

    ngOnInit() {
    }

    login() {
        const inputValue = this.loginForm.value;
        this.auth.login(inputValue.email, inputValue.password)
        .subscribe(
            success => {
                this.router.navigate(['/images']);
            },
            error => {
                this.snackBar.open('toast.serverResponse.'+error.code, 'toast.close');
            }
        );
    }

    socialLogin(provider:string){
        this.auth.loginWithProvider(provider)
            .then(success => { this.router.navigate(['/images']); })
            .catch(error => { this.snackBar.open('toast.serverResponse.' + error.code, 'toast.close'); });
    }

}
