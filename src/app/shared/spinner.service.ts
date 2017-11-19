import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SpinnerService {
    display: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() { }

}
