import { Component } from '@angular/core';
import { CoreService } from './../shared/core.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
    display: boolean = false;

    constructor(private coreSrv:CoreService) {
        coreSrv.displaySpinner.subscribe(mode => this.display = mode);
    }

}
