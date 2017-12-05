import { CoreService } from './../shared/core.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'scroll-to-top-fab',
    templateUrl: './scroll-to-top-fab.component.html',
    styleUrls: ['./scroll-to-top-fab.component.css']
})
export class ScrollToTopFabComponent implements OnInit {
    @Input() htmlElement;

    constructor(
        public coreSrv:CoreService,
    ) { }

    ngOnInit() {
    }

    scrollToTop(){
        this.htmlElement.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

}
