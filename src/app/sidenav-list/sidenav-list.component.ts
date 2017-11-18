import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

    constructor(
        public auth: AuthService,
        private router: Router,
        private translate: TranslateService,
    ) { }

    toggleLanguage() {
        let language = this.translate.currentLang == "es" ? "en" : "es";

        this.translate.use(language).subscribe(() => {
            localStorage.setItem('NGX_TRANSLATE', language);
        });
    }
}
