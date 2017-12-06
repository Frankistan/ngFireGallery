import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/snackbar.service';
import { environment } from '../../../environments/environment';
import { RecaptchaDynamicLanguageLoaderService } from '../../shared/recaptcha-dynamic-language-loader.service';
import { RecaptchaLoaderService } from 'ng-recaptcha';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    loginForm: FormGroup;
    clientKey: string = environment.recaptcha.clientKey;
    loaderReady = false;

    constructor(
        public auth: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: SnackbarService,
        @Inject(RecaptchaLoaderService) private loader: RecaptchaDynamicLanguageLoaderService,
        private zone: NgZone,
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['test@example.com', [Validators.required, Validators.email]],
            password: ['123456', Validators.required],
            recaptcha: [null, Validators.required]
        });
    }

    ngOnInit() {
        this.loader.ready.subscribe(v => {
            this.loginForm.get('recaptcha').reset();
            this.zone.run(() => this.loaderReady = !!v);
        });
    }

    login() {
        const inputValue = this.loginForm.value;
        this.auth.login(inputValue.email, inputValue.password)
            .then(() => this.router.navigate(['/images']))
            .catch(error => this.errorHandler(error.code));

    }

    socialLogin(provider: string) {
        this.auth.loginWithProvider(provider)
            .then(success => { this.router.navigate(['/images']); })
            .catch(error => this.errorHandler(error.code));
    }

    private errorHandler(error: any) {
        this.snackBar.open('toast.serverResponse.' + error, 'toast.close');
    }

}
