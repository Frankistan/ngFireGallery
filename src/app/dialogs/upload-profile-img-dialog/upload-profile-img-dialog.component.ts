import { Component, OnInit, ViewChild, Renderer} from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Upload } from '../../models/upload';

@Component({
    selector: 'app-upload-profile-img-dialog',
    templateUrl: './upload-profile-img-dialog.component.html',
    styleUrls: ['./upload-profile-img-dialog.component.css'],
})
export class UploadProfileImgDialogComponent implements OnInit {

    data: any;
    cropperSettings: CropperSettings;
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    // file:  File = null;
    // multiple: boolean = false;
    // upload: Upload = null;
    // fileInputValue = "";
    // @ViewChild('fileInput') fileInput;

    constructor(private renderer: Renderer) {

        //Cropper settings 2
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.keepAspect = false;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.rounded = true;
        this.cropperSettings.minWithRelativeToResolution = false;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.noFileInput = true;

        this.data = {};

    }

    ngOnInit() {
    }



    cropped(bounds: Bounds) {
        //console.log(bounds);
    }

    /**
     * Used to send image to second cropper
     * @param $event
     */
    fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }










    // imageChangedEvent: any = '';
    // croppedImage: any = '';

    // fileChangeEvent(event: any): void {
    //     this.imageChangedEvent = event;
    // }
    // imageCropped(image: string) {
    //     this.croppedImage = image;
    // }




}
