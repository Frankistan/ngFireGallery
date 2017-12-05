import { Component } from '@angular/core';
import { CoreService } from './../../shared/core.service';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.css']
})
export class SearchButtonComponent  {
    displaySearchBtn: boolean = true;
    isSearching: boolean = false;

    constructor(
        public coreSrv:CoreService,
    ) {
      this.coreSrv.currentPath.subscribe((path) => {
          this.displaySearchBtn = path === "images";
      });
   }

    openSearch() {
        this.isSearching = true;
        this.coreSrv.isSearching.next(this.isSearching);
    }

}
