import { Injectable } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Title } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class SetTitleOnRouteChangeService {

    title: BehaviorSubject<string> = new BehaviorSubject('');
    currentPath: BehaviorSubject<any> = new BehaviorSubject(null);
    titleTranslationKey: string = "title.app";

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private translate: TranslateService,
    ) {
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get(this.titleTranslationKey).subscribe((res: string) => {
                this.titleService.setTitle(res);
            });
        });

        this.changeTitle();
    }

    changeTitle() {
        // CHANGE TITLE ON ROUTE CHANGES
        // Dynamic page titles in Angular 2 with router events
        // FUENTE: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .subscribe((event: ActivatedRoute) => {
                let key = 'title.' + event.snapshot.data.title;

                this.title.next(key);
                this.currentPath.next(event.snapshot.routeConfig.path);

                this.translate.get(key).subscribe((res: string) => {
                    this.titleTranslationKey = key;

                    this.titleService.setTitle(res);
                });
            });
    }
}

// GET current route url
// FUENTE: https://stackoverflow.com/questions/43360625/what-is-the-easiest-way-to-get-current-route-path-name-in-angular-4
// this.router.events.subscribe((event) => {
//     if (event instanceof NavigationEnd) {
//         this.currentUrl = event.url;
//     }
// });
