import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _searchHistory: string[] = [];

  get searchHistory() {
    return [...this._searchHistory];
  }
    
  constructor() { }

  addToSearchHistory(query: string) {
    query = query.trim().toLowerCase();
    
    //Control what is being added to the search history and where
    if (!this._searchHistory.includes(query)){
      console.log('Not in')
      this._searchHistory.unshift(query);
      this._searchHistory = this._searchHistory.splice(0,10); //Keep only the last 10 entries
    } else {
      console.log('In')
      const index = this._searchHistory.indexOf(query);
      this._searchHistory.splice(index, 1);
      this._searchHistory.unshift(query);
    }
    console.log(this._searchHistory);
  }
}
