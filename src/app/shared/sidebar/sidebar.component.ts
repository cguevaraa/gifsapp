import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent {

  constructor(
    private gifsService: GifsService,
    ) {}

  get searchHistory() {
    return this.gifsService.searchHistory;
  }

  clearHistory() {
    console.log('clear!');
    this.gifsService.clearHistory();
  }

  search(query: string) {
    this.gifsService.addToSearchHistory(query);
    this.gifsService.updateResults(query);
  }

}
