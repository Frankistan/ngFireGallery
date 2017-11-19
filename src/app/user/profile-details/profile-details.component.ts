import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/match-password';
import { SnackbarService } from '../../shared/snackbar.service';
// import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../shared/user.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent {
    hide = true;
    profileForm: FormGroup;
    userInfo: User;
    showFields: boolean = false;
    subscription: Subscription;

    constructor(
        public auth: AuthService,
        private formBuilder: FormBuilder,
        private snackBar: SnackbarService,
        private userService: UserService,
        public translate: TranslateService,
    ) {
        auth.user.subscribe((user) => {
            this.userInfo = user;
            if (user && user != undefined) {
                this.profileForm = this.formBuilder.group({
                    name: [this.userInfo.displayName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                    email: [{ value: this.userInfo.email, disabled: true }, [Validators.required, Validators.email]],
                    photoURL: [this.userInfo.photoURL, []],
                    password: ['', Validators.minLength(3)],
                    password_confirm: ['', Validators.minLength(3)]
                }, {
                        validator: PasswordValidator.MatchPassword // your validation method
                    });
            }

        });

        moment.locale(translate.currentLang);

        // cambia el idioma de TIMEAGO cuando cambia el idioma de la App
        // FUNCIONA CON this.lastUpdated = new Date();
        this.subscription = this.translate.onLangChange.map(event => { return event.lang; }).subscribe((language) => {
            moment.locale(language);
        });
    }

    togglePasswordFields() {
        this.showFields = !this.showFields;
    }

    updateProfile() {
        const inputValue = this.profileForm.value;

        const data: User = {
            uid: this.userInfo.uid,
            email: this.userInfo.email,
            displayName: inputValue.name,
            photoURL: inputValue.photoURL
        };

        this.userService.update(data,inputValue.password);
    }

}
