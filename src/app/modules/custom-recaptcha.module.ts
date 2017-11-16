import { NgModule } from '@angular/core';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from './../../environments/environment';


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
      {
          provide: RECAPTCHA_LANGUAGE,
          useValue: 'es',
      },
  ],
})
export class CustomRecaptchaModule { }
