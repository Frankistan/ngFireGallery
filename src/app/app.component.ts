import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SetTitleOnRouteChangeService } from './shared/set-title-on-route-change.service';
import { ToolbarService } from './shared/toolbar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: BehaviorSubject<string> = new BehaviorSubject('title.app');

    constructor(
        private setTitleService: SetTitleOnRouteChangeService,
        private translate: TranslateService,
        public auth: AuthService,
        public toolbarSrv: ToolbarService,
    ) {

        // Setting default lang that will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');

        let language = (localStorage.getItem('NGX_TRANSLATE') != "null" && localStorage.getItem('NGX_TRANSLATE') ) ? localStorage.getItem('NGX_TRANSLATE') :  window.navigator.language.toLocaleLowerCase().split("-")[0];

        // Setting current the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(language).subscribe(()=>{
            localStorage.setItem('NGX_TRANSLATE', language);
        });
    }

    ngOnInit() {
        this.title = this.setTitleService.title;
    }

    switchLanguage(language: string) {
        this.translate.use(language).subscribe(()=>{
            localStorage.setItem('NGX_TRANSLATE', language);
        });
    }
}
