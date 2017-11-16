import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Upload } from '../../models/upload';
import * as _ from 'lodash';
import { UploadImageService } from '../../shared/upload-image.service';
import { Observable } from 'rxjs/Observable';
import { Image } from '../../models/image';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

    files: FileList | File = null;
    multiple: boolean = false;
    upload: Upload = null;

    fileInputValue = "";

    @ViewChild('fileInput') fileInput;

    constructor(
        private uploadImageService: UploadImageService,
        private renderer: Renderer,
    ) { }

    ngOnInit() {

    }

    pushFiles() {
        if (this.files instanceof FileList) {
            const filesToUpload = this.files;
            const filesIdx = _.range(filesToUpload.length);
            this.multiple = true;
            _.each(filesIdx, index => {
                this.upload = new Upload(filesToUpload[index]);
                this.uploadImageService.uploadFile(this.upload);
            });
        } else {
            this.multiple = false;
            this.upload = new Upload(this.files);
            this.uploadImageService.uploadFile(this.upload);
        }
    }

    selectEvent(files: FileList | File): void {
        this.files = files;
        this.fileInputValue = (this.files instanceof FileList) ? this.files.length + ' files' : this.files.name;
        // hack para corregir el problema en el input de archivos
        // cuando se eligen más de 1 archivo
        this.renderer.invokeElementMethod(
            this.fileInput.nativeElement, 'focus'
        );
    }

}
