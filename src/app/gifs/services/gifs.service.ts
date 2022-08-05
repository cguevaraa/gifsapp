/*
Manages the search history and the search results
*/

import { Injectable } from '@angular/core';
import { Gif } from '../interfaces/gifs.interfaces';
import { SearchService } from './search.service';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _searchHistory: string[] = [];
  public searchResults: Gif[] = []; //Async property member (populated by SearchService)

  get searchHistory() {
    return [...this._searchHistory];
  }

  constructor(private searchService: SearchService) {}

  addToSearchHistory(query: string) {

    //Controls what is being added to the search history and where
    if (!this._searchHistory.includes(query)){

      this._searchHistory.unshift(query);
      this._searchHistory = this._searchHistory.splice(0,10); //Keep only the last 10 entries
    
    } else {

      const index = this._searchHistory.indexOf(query);
      this._searchHistory.splice(index, 1);
      this._searchHistory.unshift(query);    
    }
  }

  updateResults(query: string) {
    // Fetch the gifs info from the SearchService
    this.searchService.search(query)
    .subscribe(res => {
      this.searchResults = res;
    });
  }
}
