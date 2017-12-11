import { Component, Input, ViewChild, ElementRef, DoCheck} from '@angular/core';

@Component({
    selector: 'app-image-element',
    templateUrl: './image-element.component.html',
    styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements  DoCheck {

    @Input() image;
    @ViewChild('myLazyImg') myLazyImg: ElementRef;

    constructor() {}

    ngDoCheck() {
        if (this.myLazyImg) {
            if (this.myLazyImg.nativeElement.classList.contains('ng-lazyloaded')) {
                this.myLazyImg.nativeElement.classList.remove("loading-image");
            }
        }
    }

}
