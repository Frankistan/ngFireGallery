import { Component } from '@angular/core';
import { SpinnerService } from '../shared/spinner.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
    display: boolean = false;

    constructor(spinnerSrv: SpinnerService,
    ) {
        spinnerSrv.display.subscribe(mode => this.display = mode);
    }

}
