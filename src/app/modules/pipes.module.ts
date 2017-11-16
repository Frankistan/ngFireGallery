import { NgModule } from '@angular/core';
// import { LocalizedDatePipe } from '../shared/pipes/localized-date-pipe.pipe';


const PIPES = [
    // LocalizedDatePipe
];

@NgModule({
    imports: [],
    declarations: [...PIPES],
    providers: [],
    exports: [...PIPES]
})
export class PipesModule {
}
