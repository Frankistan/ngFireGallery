import { CoreService } from './../shared/core.service';
import { Component } from '@angular/core';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../shared/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    checked = JSON.parse(localStorage.getItem('settings')).isDark;
    selectedLanguage: string = JSON.parse(localStorage.getItem('settings')).language;

    languages = [
        { value: 'es', viewValue: 'Español' },
        { value: 'en', viewValue: 'English' }
    ];

    constructor(
        private coreSrv:CoreService,
        private translate: TranslateService,
        private settingsService:SettingsService,
    ) {
        coreSrv.darkTheme.subscribe( isDark =>{
            this.checked =  isDark ;
        });

        coreSrv.language.subscribe(lang => {
            this.selectedLanguage = lang;
        });
    }

    switchTheme(event: MatSlideToggleChange) {
        let settings = {
            isDark: event.checked
        }

        this.coreSrv.darkTheme.next(event.checked);
        this.settingsService.saveSettings(settings);
    }

    switchLanguage(event: MatSelectChange) {
        let settings = {
            language: event.value
        };

        this.coreSrv.language.next(event.value);
        this.settingsService.saveSettings(settings);
    }

}
