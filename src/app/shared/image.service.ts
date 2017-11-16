import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Upload } from './../models/upload';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Image } from '../models/image';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class ImageService {

    imagesCollection: AngularFirestoreCollection<Image>;
    images: Observable<Image[]>;
    image: Observable<Image>;

    userId: string = null;

    query = new BehaviorSubject<any>(null);

    filter: any = null;

    search: BehaviorSubject<any> = new BehaviorSubject<any>({ name: "" });

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ) {
        this.query.subscribe((filter) => {
            this.filter = filter;
        });

        this.afAuth.authState.subscribe(user => {
            if (user != undefined && user != null) {
                this.userId = user.uid;

                this.imagesCollection = this.afs.doc(`images/${user.uid}`)
                    .collection('album', ref => ref.orderBy('createdAt', 'desc'));

                // FUENTE: https://www.youtube.com/watch?v=cwqeyOFcaoA
                this.images = this.imagesCollection.snapshotChanges().map(changes => {
                    return changes.map(a => {
                        // if(!a.payload.doc.exists) return ;
                        const data = a.payload.doc.data() as Image;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                });
            }
        });
    }

    list(): Observable<Image[]> {
        if (!this.userId) return;

        if (this.filter != null) {

            this.imagesCollection = this.afs.doc(`images/${this.userId}`)
                .collection('album', ref =>
                    ref.orderBy('createdAt', 'desc')
                        .where(this.filter.part1, this.filter.op, this.filter.part2)
                );
        }
        else {
            this.imagesCollection = this.afs.doc(`images/${this.userId}`)
                .collection('album', ref => ref.orderBy('createdAt', 'desc'));
        }

        this.images = this.imagesCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Image;
                data.id = a.payload.doc.id;
                return data;
            });
        });

        // this.query.next(null);

        return this.images;
    }

    create(image: Image) {
        this.imagesCollection.add(image);
    }

    read(id: string): Observable<Image> {
        const imageDoc = this.afs.doc<Image>(`images/${this.userId}/album/${id}`);

        this.image = imageDoc.snapshotChanges().map(changes => {
            if (!changes.payload.exists) return;
            const data = changes.payload.data() as Image;
            data.id = changes.payload.id;
            return data;
        });

        return this.image;
    }

    update(image: Image):Promise<any> {
        const imageDoc = this.afs.doc<Image>(`images/${this.userId}/album/${image.id}`);

        return imageDoc.update(image);
    }

    delete(image: Image): Observable<void> {
        return Observable.fromPromise(this.deleteFromStorage(image).then(() => {
            this.deleteFromDB(image.id);
        }));
    }

    // Delete image from Storage
    private deleteFromStorage(image: Image): Promise<any> {
        let storageRef = firebase.storage().ref();
        let path = `uploads/${image.name}`;

        return storageRef.child(path).delete();
    }

    // Delete image from Database
    private deleteFromDB(id: string): Promise<void> {
        const imageDoc = this.afs.doc<Image>(`images/${this.userId}/album/${id}`);

        return imageDoc.delete();
    }

}
