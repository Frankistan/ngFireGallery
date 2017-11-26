import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ScrollService {
    scrolling: BehaviorSubject<string> = new BehaviorSubject('up');
}
