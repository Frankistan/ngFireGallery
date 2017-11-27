import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ThemeSwitcherService {
    darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);


    constructor() { }

}
