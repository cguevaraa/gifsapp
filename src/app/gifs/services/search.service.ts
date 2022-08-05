/*
Builds and sends the http request and fetch
the data in the response.
*/ 

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import connection from '../../connection/giphy.json' //Import here your own json with your (Giphy) API key
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _urlService: string = 'https://api.giphy.com/v1/gifs';
  private _limit: number = 10;

  constructor(private http: HttpClient) { }

  search(query: string): Observable<Gif[]> {

    const params: HttpParams = new HttpParams()
      .set('api_key', connection.key)
      .set('limit', this._limit)
      .set('q', query);

    const subject = new Subject<Gif[]>();
    this.http.get<SearchGIFResponse>(`${this._urlService}/search`, {params})
      .subscribe(res => {
        subject.next(res.data);
        subject.complete();
      });
    return subject.asObservable();
  }
}
