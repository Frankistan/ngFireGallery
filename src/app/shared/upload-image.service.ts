import { ImageService } from './image.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { SnackbarService } from './snackbar.service';
import { Upload } from '../models/upload';
import { Image } from '../models/image';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';

@Injectable()
export class UploadImageService {

    private userId: string = null;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private snackbar: SnackbarService,
        private imageService: ImageService,
        private userSrv:UserService,
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user != undefined && user != null)
                this.userId = user.uid;
        });
    }

    uploadFile(upload: Upload) {
        const storageRef = firebase.storage().ref();

        const uploadTask = storageRef.child(`uploads/${upload.name}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // upload in progress
                upload.progress = 0;
                upload.progress = Math.round(((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100) * 100) / 100;
            },
            (error) => {
                // upload failed
                this.snackbar.open(error.message, 'toast.close', 3000);
            },
            () => {
                // upload success
                // Writes the file details to the db
                // const id = this.afs.createId();
                const image = {
                    name: upload.name,
                    createdAt: this.timestamp,
                    uid: this.userId,
                    url: uploadTask.snapshot.downloadURL,
                    liked: false,
                    originalName: upload.name.split("_")[2]
                }
                this.imageService.create(image);
            }
        );
    }

    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    uploadAvatar(upload: Upload,userInfo:User) {
        const storageRef = firebase.storage().ref();

        const uploadTask = storageRef.child(`uploads/avatar/${this.userId}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // upload in progress
                // upload.progress = 0;
                // upload.progress = Math.round(((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100) * 100) / 100;
            },
            (error) => {
                // upload failed
                this.snackbar.open(error.message, 'toast.close', 3000);
            },
            () => {
                // upload success
                userInfo.photoURL = uploadTask.snapshot.downloadURL;
                this.userSrv.update(userInfo);
            }
        );
    }
}
