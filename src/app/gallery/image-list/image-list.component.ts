import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from '../../shared/image.service';
import { Observable } from 'rxjs/Observable';
import { Image } from '../../models/image';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit, OnDestroy {
    search: any = { name: '' };
    images: Observable<Image[]>;
    cols: number = 3;
    rowHeight: string = '240px';
    watcher: Subscription;
    subscription: Subscription;
    totalImages: boolean;
    showSpinner: boolean = true;
    display = "flex";

    constructor(
        private imageService: ImageService,
        public media: ObservableMedia,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.watcher = media.asObservable().subscribe((change: MediaChange) => {
            // console.log('tamaño: ', change.mqAlias);
            switch (change.mqAlias) {
                case 'xs': this.cols = 2;
                    break;
                case 'sm': this.cols = 3;
                    break;
                case 'md': this.cols = 4;
                    break;
                case 'lg': this.cols = 4;
                    break;
            }
        });
        this.imageService.search.subscribe((filter) => {
            this.search = filter;
        });

        this.route.url.subscribe((ruta) => {
            if (ruta[0].path === "favorites") {
                this.imageService.query.next({
                    part1: "liked",
                    op: "==",
                    part2: true
                });
            } else {
                this.imageService.query.next(null);
            }
        });
    }

    ngOnInit() {
        this.images = this.imageService.list();
        this.display = "flex";
        // this.subscription = this.images.subscribe(() => this.showSpinner = false);
        this.subscription = this.images.subscribe((images) => {
            this.showSpinner = false;
            this.totalImages = images.length > 0;
            if (this.totalImages) { this.display = "flex"; }
            else {
                this.display = "none";
            }
        });
    }

    ngOnDestroy() {
        this.watcher.unsubscribe();
        if (this.subscription)
            this.subscription.unsubscribe();
    }

}
