import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ScrollTrackerEventData } from '@nicky-lenaers/ngx-scroll-tracker';

@Injectable()
export class ScrollService {
    scrolling: BehaviorSubject<string> = new BehaviorSubject('up');


    constructor() {}

    scrollToTop(eventData: ScrollTrackerEventData){
        eventData.$event.srcElement.scroll(0, 0);
    }

}
