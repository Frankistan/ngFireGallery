import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class CoreService {
    currentPath: BehaviorSubject<string> = new BehaviorSubject("");
    darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
    language: BehaviorSubject<string> = new BehaviorSubject('es');
    displaySpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
    scrolling: BehaviorSubject<string> = new BehaviorSubject("up");
    title: BehaviorSubject<string> = new BehaviorSubject("");
    titleTranslationKey: string = "title.app";

    constructor(
        private translate: TranslateService,
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get(this.titleTranslationKey).subscribe((res: string) => {
                this.titleService.setTitle(res);
            });
        });
        this.language.subscribe(lang => {
            if (!lang) return;
            translate.use(lang).subscribe(() => {
                return;
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
