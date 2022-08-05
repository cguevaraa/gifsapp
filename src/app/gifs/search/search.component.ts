import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  
  constructor(
    private gifsService: GifsService,
    private searchService: SearchService
    ) {}

  search() {
    let query = this.txtSearch.nativeElement.value;

    // If the string is void, do nothing
    if (query.trim().length === 0) return;
    // Basic text preprocessing
    query = query.trim().toLowerCase();

    this.gifsService.addToSearchHistory(query);
    this.gifsService.updateResults(query);

    this.txtSearch.nativeElement.value = '';
  }
}
