import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { AuthService } from '../shared/auth.service';
import { User } from '../models/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../validators/match-password';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../shared/user.service';
import { UploadImageService } from '../shared/upload-image.service';
import { Upload } from '../models/upload';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

    userInfo: User;
    profileForm: FormGroup;
    subscription: Subscription;
    showFields: boolean = false;

    upload: Upload = null;

    animal: string;
    name: string;
    image: File = null;

    constructor(
        private dialog: MatDialog,
        public auth: AuthService,
        private formBuilder: FormBuilder,
        public translate: TranslateService,
        private userService: UserService,
        private uploadImageSrv: UploadImageService,) {
        auth.user.subscribe((user) => {
            this.userInfo = user;
            if (user && user != undefined) {
                this.profileForm = this.formBuilder.group({
                    name: [this.userInfo.displayName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                    email: [{ value: this.userInfo.email, disabled: true }, [Validators.required, Validators.email]],
                    photoURL: [this.userInfo.photoURL, []],
                    password: ['', Validators.minLength(3)],
                    password_confirm: ['', Validators.minLength(3)]
                }, {
                        validator: PasswordValidator.MatchPassword // your validation method
                    });
            }

        });

        moment.locale(translate.currentLang);

        // cambia el idioma de TIMEAGO cuando cambia el idioma de la App
        // FUNCIONA CON this.lastUpdated = new Date();
        this.subscription = this.translate.onLangChange.map(event => { return event.lang; }).subscribe((language) => {
            moment.locale(language);
        });
    }

    ngOnInit() {

    }

    togglePasswordFields() {
        this.showFields = !this.showFields;
    }

    updateProfile() {
        const inputValue = this.profileForm.value;

        const data: User = {
            uid: this.userInfo.uid,
            email: this.userInfo.email,
            displayName: inputValue.name,
            photoURL: inputValue.photoURL
        };

        this.userService.update(data, inputValue.password);
    }

    uploadAvatar(image) {

        this.upload = new Upload(image);
        this.uploadImageSrv.uploadAvatar(this.upload,this.userInfo);
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            // width: '250px',
            data: { name: this.name, animal: this.animal, file: this.image }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if(result && result.file)
                this.uploadAvatar(result.file);
        });
    }

}




@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
  <div fxLayout="column">
    <h2 mat-dialog-title> {{ 'dialog.avatar.title' | translate }} </h2>
    <hr />
    <mat-dialog-content>
        <div>
            <h3>
                Recorta la imagen
                    <input id="custom-input" type="file" (change)="fileChangeListener($event)">
            </h3>
            <img-cropper #cropper [image]="inputData" [settings]="cropperSettings"></img-cropper>
            <br>
            <span class="result rounded" *ngIf="inputData.image">
                <img [src]="inputData.image" [width]="cropperSettings.croppedWidth" [height]="cropperSettings.croppedHeight">
            </span>
        </div>
    </mat-dialog-content>
    <hr />
    <mat-dialog-actions align="end">
        <button mat-raised-button (click)="onNoClick()" tabindex="-1" color="warn">Cancel</button>
        <button mat-button [mat-dialog-close]="data" tabindex="2">Upload</button>
    </mat-dialog-actions>
</div>
            `,
})
export class DialogOverviewExampleDialog implements OnInit {

    texto: string ="hola que tal";
    file: File = null;
    inputData: any;
    cropperSettings: CropperSettings;
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
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

        this.inputData = {};
        }

    ngOnInit() {
        // Pista: https://stackoverflow.com/questions/39876932/angular-2-image-uploader-with-cropper
        this.data.animal = "cats";
        this.data.name = "Frantxu";
        var that =this;
        this.cropper.onCrop.subscribe(event => {
            // this.inputData == that.cropper.image
            // this.inputData.image es base64

            // this.fileToUpload = this.blobToFile(this.convertToBlob(this.inputData.image), this.file.name);
            // var b = this.convertToBlob(this.inputData.image);
            //  this.urltoFile(b, this.file.name, b.type)
            this.urltoFile(this.inputData.image, this.file.name, 'image/jpeg')
                .then(function (file) {
                    if (file) {
                        console.log('convertido a archivo', file);
                        // this.fileToUpload = file;
                        that.data.file = file;
                    }
                });
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    fileChangeListener($event) {
        var image: any = new Image();
        this.file = $event.target.files[0];

        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(this.file);
    }

    //return a promise that resolves with a File instance
    // FUENTE: https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
    private urltoFile(url, filename, mimeType) {
        mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
            .then((res) => { return res.arrayBuffer(); })
            .then((buf) => { return new File([buf], filename, { type: mimeType }); })
        );
    }

}
