/*
Manages the search history and the search results
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import connection from '../../connection/giphy.json' //Import here your own json with your (Giphy) API key
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interfaces';



@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _url: string = 'https://api.giphy.com/v1/gifs/search';
  private _limit: number = 10;


  private _searchHistory: string[] = [];
  public searchResults: Gif[] = [];

  get searchHistory() {
    return [...this._searchHistory];
  }

  constructor(private http: HttpClient) {}

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
    const request = `${this._url}?api_key=${connection.key}&q=${query}&limit=${this._limit}`;
    this.http.get<SearchGIFResponse>(request)
      .subscribe((res) => {
      console.log(res.data);
      this.searchResults = res.data;
      });
  }
}
