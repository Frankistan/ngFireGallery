import { NgModule } from '@angular/core';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RecaptchaDynamicLanguageLoaderService } from '../shared/recaptcha-dynamic-language-loader.service';
import { environment } from './../../environments/environment';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaLoaderService } from 'ng-recaptcha';


@NgModule({
    imports: [
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule
    ],
    exports: [
        RecaptchaModule,
        RecaptchaFormsModule
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings,
        },
        //   {
        //       provide: RECAPTCHA_LANGUAGE,
        //       useValue: 'es',
        //   },
        {
            provide: RecaptchaLoaderService,
            useClass: RecaptchaDynamicLanguageLoaderService,
        },
    ],
})
export class CustomRecaptchaModule { }
