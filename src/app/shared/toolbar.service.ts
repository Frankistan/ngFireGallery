import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ToolbarService {
    isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
    currentPath: BehaviorSubject<string> = new BehaviorSubject("");

    constructor() { }

}
