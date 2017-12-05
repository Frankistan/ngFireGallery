import { CoreService } from './../../shared/core.service';
import { Component } from '@angular/core';
import { ImageService } from '../../shared/image.service';


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

    isSearching: boolean = false;

    constructor(
        private imageSrv: ImageService,
        private coreSrv:CoreService,
    ) {
        this.coreSrv.isSearching.subscribe((searching) => {
            this.isSearching = searching;
        })
    }

    search(searchText: string) {
        this.imageSrv.search.next({ name: searchText });
    }

    closeSearch() {
        this.isSearching = false;
        this.coreSrv.isSearching.next(this.isSearching);
        this.imageSrv.search.next({ name: "" });
    }
}
