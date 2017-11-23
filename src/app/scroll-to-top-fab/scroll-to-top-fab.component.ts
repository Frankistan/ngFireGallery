import { Component, OnInit, Input } from '@angular/core';
import { ScrollService } from '../shared/scroll.service';

@Component({
    selector: 'scroll-to-top-fab',
    templateUrl: './scroll-to-top-fab.component.html',
    styleUrls: ['./scroll-to-top-fab.component.css']
})
export class ScrollToTopFabComponent implements OnInit {
    @Input() htmlElement;

    constructor(
        public scrollSrv: ScrollService,
    ) { }

    ngOnInit() {
    }

    scrollToTop(){
        this.htmlElement.scroll(0, 0);
    }

}
