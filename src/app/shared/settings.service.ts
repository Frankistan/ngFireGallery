import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SettingsService {
    darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
