import { Component } from '@angular/core';
import { SetTitleOnRouteChangeService } from '../../shared/set-title-on-route-change.service';
import { ImageService } from '../../shared/image.service';
import { ToolbarService } from '../../shared/toolbar.service';


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

    isSearching: boolean = false;

    constructor(
        private setTitleService: SetTitleOnRouteChangeService,
        private imageSrv: ImageService,
        private toolbarSrv: ToolbarService,
    ) {
        this.toolbarSrv.isSearching.subscribe((searching) => {
            this.isSearching = searching;
        })
    }

    search(searchText: string) {
        this.imageSrv.search.next({ name: searchText });
    }

    closeSearch() {
        this.isSearching = false;
        this.toolbarSrv.isSearching.next(this.isSearching);
        this.imageSrv.search.next({ name: "" });
    }
}
