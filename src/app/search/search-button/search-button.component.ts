import { Component } from '@angular/core';
import { SetTitleOnRouteChangeService } from '../../shared/set-title-on-route-change.service';
import { ToolbarService } from '../../shared/toolbar.service';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.css']
})
export class SearchButtonComponent  {
    displaySearchBtn: boolean = true;
    isSearching: boolean = false;

    constructor(
        private setTitleService: SetTitleOnRouteChangeService,
        public toolbarSrv: ToolbarService,
    ) {
      this.setTitleService.currentPath.subscribe((path) => {
          this.displaySearchBtn = path === "images";
      });
   }

    openSearch() {
        this.isSearching = true;
        this.toolbarSrv.isSearching.next(this.isSearching);
    }

}
