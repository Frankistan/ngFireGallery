import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective {
    // FUENTE: https://stackoverflow.com/questions/41873893/angular2-autofocus-input-element
    constructor(private elementRef: ElementRef) { };

    ngOnInit(): void {
        this.elementRef.nativeElement.focus();
    }
}
