/*
Manages the search history and the search results
*/

import { Injectable } from '@angular/core';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _searchHistory: string[] = [];
  private _searchResults: any; //string[] = [];

  get searchHistory() {
    return [...this._searchHistory];
  }

  get searchResults() {
    return [...this._searchResults];
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
    this._searchResults = this.searchService.search(query);
    console.log(this._searchResults);
  }
}
