import { Component, OnInit, Input, ViewChild, ElementRef, DoCheck} from '@angular/core';

@Component({
    selector: 'app-image-element',
    templateUrl: './image-element.component.html',
    styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements OnInit, DoCheck {

    @Input() image;
    @ViewChild('myLazyImg') myLazyImg: ElementRef;

    constructor() {}

    ngOnInit() {

    }


    ngDoCheck() {
        if (this.myLazyImg) {

            if (this.myLazyImg.nativeElement.classList.contains('ng-lazyloaded')) {
                console.log('si', );
                this.myLazyImg.nativeElement.classList.remove("loading-image");

            }
        }
    }

}
