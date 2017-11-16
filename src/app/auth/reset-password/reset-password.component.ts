import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../shared/snackbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    constructor(
        private auth: AuthService,
        private snackBar: SnackbarService,
        private formBuilder: FormBuilder,
    ) {
        this.resetForm = this.formBuilder.group({
            email: ['fffernandez84@gmail.com', [Validators.required, Validators.email]]
        });
    }

    ngOnInit() {
    }

    resetPassword(email: string) {
        this.auth.resetPassword(email)
            .then(success => { this.snackBar.open('toast.reset_pwd', 'toast.close'); })
            .catch(error => { this.snackBar.open('toast.serverResponse.' + error.code, 'toast.close'); });
    }

}
