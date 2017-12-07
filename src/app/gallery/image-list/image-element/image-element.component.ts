import { Component, OnInit, Input, ViewChild, ElementRef, DoCheck} from '@angular/core';

@Component({
    selector: 'app-image-element',
    templateUrl: './image-element.component.html',
    styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements OnInit, DoCheck {

    @Input() image;
    @ViewChild('patientDDL') patientDDL: ElementRef;

    constructor() {}

    ngOnInit() {

    }


    ngDoCheck() {
        if (this.patientDDL) {

            if (this.patientDDL.nativeElement.classList.contains('ng-lazyloaded')) {
                console.log('si', );
                this.patientDDL.nativeElement.classList.remove("loading-image");

            }
        }
    }

}
