/*
Manages the search history and call the searchService with the search query
*/

import { Injectable } from '@angular/core';
import { SearchService } from './search.service';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _searchHistory: string[] = [];

  get searchHistory() {
    return [...this._searchHistory];
  }

  constructor(private searchService: SearchService) {}

  addToSearchHistory(query: string) {
    query = query.trim().toLowerCase();
    
    //Control what is being added to the search history and where
    if (!this._searchHistory.includes(query)){

      this._searchHistory.unshift(query);
      this._searchHistory = this._searchHistory.splice(0,10); //Keep only the last 10 entries
    
    } else {

      const index = this._searchHistory.indexOf(query);
      this._searchHistory.splice(index, 1);
      this._searchHistory.unshift(query);
    
    }
  }

}
