import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
} from '@angular/material';

import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';

const MaterialModule = [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
];

@NgModule({
    exports: [
        MaterialModule
    ],
})
export class CustomMaterialModule { }
