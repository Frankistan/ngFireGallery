import { Component, EventEmitter, NgZone, Inject } from '@angular/core';
import { TranslateService, DefaultLangChangeEvent } from '@ngx-translate/core';
import { ScrollTrackerEventData } from '@nicky-lenaers/ngx-scroll-tracker';
import { RecaptchaLoaderService } from 'ng-recaptcha';
import { AuthService } from './shared/auth.service';
import { CoreService } from './shared/core.service';
import { SettingsService } from './shared/settings.service';
import { RecaptchaDynamicLanguageLoaderService } from './shared/recaptcha-dynamic-language-loader.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: BehaviorSubject<string> = new BehaviorSubject('title.app');
    scrollPosition: number = 0;
    scrollableElement = null;
    offSet: number = 240;

    constructor(
        private translate: TranslateService,
        public auth: AuthService,
        public coreSrv: CoreService,
        private settingsService: SettingsService,
        @Inject(RecaptchaLoaderService) private loader: RecaptchaDynamicLanguageLoaderService,
        private zone: NgZone,
    ) {
        // Setting default lang that will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');


        // Captcha's Subscription to language changes
        translate.onLangChange.subscribe((event: DefaultLangChangeEvent) => {
            this.loader.updateLanguage(this.translate.currentLang);
        });
        // translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
        //     this.loader.updateLanguage(this.translate.currentLang);
        // });

        this.settingsService.loadSettings.subscribe((settings) => {

            this.coreSrv.darkTheme.next(settings.isDark);
            this.coreSrv.language.next(settings.language);
            this.title = this.coreSrv.title;
        });
    }


    scrollHandler(eventData: ScrollTrackerEventData) {
        let win = eventData.$event.srcElement ? eventData.$event.srcElement.scrollTop : 0;
        let scroll = win;

        if (scroll > this.scrollPosition && this.scrollPosition > this.offSet) {

            this.coreSrv.scrolling.next('down');
        } else {
            this.coreSrv.scrolling.next('up');
            if (eventData.$event.srcElement) {
                this.scrollableElement = eventData.$event.srcElement;
            }
        }
        this.scrollPosition = scroll;
    }



    switchLanguage(language: string) {
        let settings = {
            language: language
        };

        this.coreSrv.language.next(language);
        this.settingsService.saveSettings(settings);
    }
}
