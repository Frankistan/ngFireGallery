import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteImageDialogComponent } from '../../dialogs/delete-image-dialog/delete-image-dialog.component';
import { Image } from '../../models/image';
import { ImageService } from '../../shared/image.service';
import { MatDialog } from '@angular/material';
import { SnackbarService } from '../../shared/snackbar.service';
import { Observable } from 'rxjs/Observable';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as moment from 'moment';


@Component({
    selector: 'app-image-detail',
    templateUrl: './image-detail.component.html',
    styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent  {
    image$: Observable<Image>;

    // lastUpdated = new Date();

    constructor(
        private imageService: ImageService,
        private snackBar: SnackbarService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public translate: TranslateService,
    ) {
        let id = this.route.snapshot.params['id'];
        this.image$ = this.imageService.read(id);

        moment.locale(translate.currentLang);

        // cambia el idioma de TIMEAGO cuando cambia el idioma de la App
        // FUNCIONA CON this.lastUpdated = new Date();
        this.translate.onLangChange.map(event => { return event.lang; }).subscribe((language)=>{
            moment.locale(language);
        });
     }



    openDeleteDialog(image): void {
        let dialogRef = this.dialog.open(DeleteImageDialogComponent, {
            // width: '250px',
            data: { name: image.name }
        });

        // resultado de las acciones en el Dialog
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteImage(image);
            }
        });
    }

    toogleFav(image) {
        image.liked = !image.liked;
        this.imageService.update(image)
            .then(success => {
                if (image.liked)
                    { this.snackBar.open('toast.image.liked', 'toast.close',1500); }
                else
                    { this.snackBar.open('toast.image.not_liked', 'toast.close',1500); }
            })
            .catch(error => { this.snackBar.open('toast.serverResponse.' + error.message, 'toast.close'); });
    }

    deleteImage(image) {
        // this.subscription = this.imageService.delete(image)
        this.imageService.delete(image)
            .subscribe(
            success => {
                this.snackBar.open('toast.image.deleted', 'toast.close');
                this.router.navigate(['/images']);
            },
            error => { this.snackBar.open('toast.serverResponse.' + error.code, 'toast.close'); }
            );
    }

    // ngOnDestroy() {
    //     if (this.subscription)
    //         this.subscription.unsubscribe();
    // }

}
