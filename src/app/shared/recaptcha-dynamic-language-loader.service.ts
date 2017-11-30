//our root app component
import { Component, NgModule, Injectable, Inject, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RecaptchaModule, RecaptchaLoaderService } from 'ng-recaptcha';

@Injectable()
export class RecaptchaDynamicLanguageLoaderService {
    public ready: Observable<any>;
    public language = '';
    private static ready: BehaviorSubject<any>;

    constructor() {
        this.init();
        this.ready = RecaptchaDynamicLanguageLoaderService.ready.asObservable();
    }

    public updateLanguage(newLang: string): void {
        this.language = newLang;
        RecaptchaDynamicLanguageLoaderService.ready.next(null);
        this.init();
        this.recaptchaScript();
    }

    private init() {
        if (RecaptchaDynamicLanguageLoaderService.ready) {
            if (RecaptchaDynamicLanguageLoaderService.ready.getValue()) {
                return;
            }
        } else {
            RecaptchaDynamicLanguageLoaderService.ready = new BehaviorSubject<any>(null);
            window.ng2recaptchaloaded = () => {
                RecaptchaDynamicLanguageLoaderService.ready.next(grecaptcha);
            };
        }
    }

    private recaptchaScript(){
        const script = document.createElement('script') as HTMLScriptElement;
        script.innerHTML = '';
        const langParam = this.language ? '&hl=' + this.language : '';
        script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded${langParam}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
}
