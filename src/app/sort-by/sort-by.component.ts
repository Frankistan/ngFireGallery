import { Component } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { SetTitleOnRouteChangeService } from '../shared/set-title-on-route-change.service';

@Component({
    selector: 'app-sort-by',
    templateUrl: './sort-by.component.html',
    styleUrls: ['./sort-by.component.css']
})
export class SortByComponent {
    order: string = "";
    display: boolean = false;

    constructor(
        public imageService: ImageService,
        private setTitleService: SetTitleOnRouteChangeService,
    ) {
        this.setTitleService.currentPath.subscribe((path) => {
            this.display = path === "images";
        });
    }

    orderBy(mode: string) {
        this.order = this.order == "" ? 'reverse' : "";
        this.imageService.sortBy.next({ sortBy: mode, order: this.order });
    }

}
