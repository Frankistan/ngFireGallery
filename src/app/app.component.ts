import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SetTitleOnRouteChangeService } from './shared/set-title-on-route-change.service';
import { ToolbarService } from './shared/toolbar.service';
import { TranslateService } from '@ngx-translate/core';
import { ScrollTrackerEventData } from '@nicky-lenaers/ngx-scroll-tracker';
import { ScrollService } from './shared/scroll.service';
import { SettingsService } from './shared/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: BehaviorSubject<string> = new BehaviorSubject('title.app');
    scrollPosition: number = 0;
    scrollableElement = null;
    offSet: number = 240;

    constructor(
        private setTitleService: SetTitleOnRouteChangeService,
        private translate: TranslateService,
        public auth: AuthService,
        public toolbarSrv: ToolbarService,
        private scrollSrv:ScrollService,
        public settingsSrv:SettingsService,
    ) {
        // Load the theme predefined by user settings
        let isDark = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')).isDark : false;
        this.settingsSrv.darkTheme.next(isDark);

        // Setting default lang that will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');

        let language = (localStorage.getItem('NGX_TRANSLATE') != "null" && localStorage.getItem('NGX_TRANSLATE')) ? localStorage.getItem('NGX_TRANSLATE') : window.navigator.language.toLocaleLowerCase().split("-")[0];

        // Setting current the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(language).subscribe(() => {
            localStorage.setItem('NGX_TRANSLATE', language);
        });
    }

    ngOnInit() {
        this.title = this.setTitleService.title;
    }

    scrollHandler(eventData: ScrollTrackerEventData) {
        let win = eventData.$event.srcElement ? eventData.$event.srcElement.scrollTop : 0;
        let scroll = win;

        if (scroll > this.scrollPosition && this.scrollPosition> this.offSet) {

            this.scrollSrv.scrolling.next('down');
        } else {
            this.scrollSrv.scrolling.next('up');
            if (eventData.$event.srcElement){
                this.scrollableElement = eventData.$event.srcElement;
            }
        }
        this.scrollPosition = scroll;
    }

    switchLanguage(language: string) {
        this.translate.use(language).subscribe(() => {
            localStorage.setItem('NGX_TRANSLATE', language);
        });
    }
}
