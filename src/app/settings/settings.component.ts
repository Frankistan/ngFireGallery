import { Component } from '@angular/core';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';
import { SettingsService } from '../shared/settings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    checked = false;
    selectedLanguage: string = localStorage.getItem('NGX_TRANSLATE');

    languages = [
        { value: 'es', viewValue: 'Español' },
        { value: 'en', viewValue: 'English' }
    ];

    constructor(
        private settingsSrv: SettingsService,
        private translate: TranslateService,
    ) {

        this.checked =  localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')).isDark : false;
    }

    switchTheme(event: MatSlideToggleChange) {
        this.settingsSrv.darkTheme.next(event.checked);
        let settings = {
            "isDark": event.checked
        }
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    switchLanguage(event: MatSelectChange) {
        // console.log('lang: ', event.value);
        let language = event.value;

        this.translate.use(language).subscribe(() => {
            localStorage.setItem('NGX_TRANSLATE', language);
        });
    }

}
