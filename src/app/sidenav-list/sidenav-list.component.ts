import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent  {

    constructor(
        public auth: AuthService,
        private router: Router,
        private translate: TranslateService,
    ) { }

  toggleLanguage() {
      this.translate.currentLang == "es" ? this.translate.use("en") : this.translate.use("es");
  }
}
