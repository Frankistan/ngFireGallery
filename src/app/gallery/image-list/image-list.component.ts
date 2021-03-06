import { CoreService } from './../../shared/core.service';
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
    images$: Observable<Image[]>;
    cols: number = 3;
    rowHeight: string = '240px';
    watcher: Subscription;
    subscription: Subscription;
    totalImages: boolean;

    search: any = { name: '' };
    sortBy: BehaviorSubject<{}> = new BehaviorSubject({ sortBy: 'createdAt', order: '' });
    order: string = '';

    constructor(
        private imageService: ImageService,
        public media: ObservableMedia,
        private router: Router,
        private route: ActivatedRoute,
        public coreSrv: CoreService,
    ) {

        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        switch (true) {
            case (x < 599): this.cols = 2; // 'screen and (max-width: 599px)'
                break;
            case (x < 959): this.cols = 3; // 'screen and (min-width: 600px) and (max-width: 959px)'
                break;
            case (x < 1279): this.cols = 4; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                break;
            case (x < 1919): this.cols = 5; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                break;
        };
        // https://youtu.be/w9InzT-SdIE?t=6m20s
        this.watcher = media.asObservable().subscribe((change: MediaChange) => {

            switch (change.mqAlias) {
                case 'xs': this.cols = 2; // 'screen and (max-width: 599px)'
                    break;
                case 'sm': this.cols = 3; // 'screen and (min-width: 600px) and (max-width: 959px)'
                    break;
                case 'md': this.cols = 4; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                    break;
                case 'lg': this.cols = 5; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                    break;
            }
        });
        this.imageService.search.subscribe((filter) => {
            this.search = filter;
        });

        this.imageService.sortBy.subscribe((data: any) => {
            this.sortBy = data.sortBy;
            this.order = data.order;
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
        this.coreSrv.displaySpinner.next(true);
        this.images$ = this.imageService.list();
        this.subscription = this.imageService.list().subscribe(images => {
            this.totalImages = images.length > 0;
            this.coreSrv.displaySpinner.next(false);
        });
    }

    ngOnDestroy() {
        this.watcher.unsubscribe();
        this.coreSrv.displaySpinner.next(false);
        if (this.subscription)
            this.subscription.unsubscribe();
    }

}
