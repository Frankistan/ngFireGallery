import { NgModule } from '@angular/core';
import { CovalentLayoutModule, CovalentFileModule} from '@covalent/core';

@NgModule({
    exports: [
        CovalentLayoutModule,
        CovalentFileModule,
    ],
})
export class CustomCovalentModule { }
