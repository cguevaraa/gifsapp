/*
Builds and sends the http request and fetch
the data in the response.
*/ 

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import connection from '../../connection/giphy.json' //Import here your own json with your (Giphy) API key
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _url: string = 'https://api.giphy.com/v1/gifs/search';
  private _limit: number = 10;

  constructor(private http: HttpClient) { }

  search(query: string): Observable<Gif[]> {
    const subject = new Subject<Gif[]>();
    const request = `${this._url}?api_key=${connection.key}&q=${query}&limit=${this._limit}`;

    this.http.get<SearchGIFResponse>(request)
      .subscribe(res => {
        subject.next(res.data);
        subject.complete();
      });
    return subject.asObservable();
  }
}
