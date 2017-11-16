import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-image-dialog',
  templateUrl: './delete-image-dialog.component.html',
  styleUrls: ['./delete-image-dialog.component.css']
})
export class DeleteImageDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onCloseCancel() {
        this.dialogRef.close(false);
    }

    onCloseConfirm() {
        this.dialogRef.close(true);
    }

}
