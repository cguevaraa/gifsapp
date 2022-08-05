/*
Builds and sends the http request and fetch
the data in the response.
*/ 

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import connection from '../../connection/giphy.json' //Import here your own json with your (Giphy) API key

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _url: string = 'https://api.giphy.com/v1/gifs/search';
  private _limit: number = 5;

  constructor(private http: HttpClient) { }

  search(query: string) {
    const request = `${this._url}?api_key=${connection.key}&q=${query}&limit=${this._limit}`;
    this.http.get(request)
      .subscribe((res: any) => {
        return res.data;
      });
  }
}
