import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-image-element',
    templateUrl: './image-element.component.html',
    styleUrls: ['./image-element.component.css']
})
export class ImageElementComponent implements OnInit {

    @Input() image;

    constructor() {}

    ngOnInit() {

    }

}
