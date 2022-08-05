import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {

  results: any;

  get searchResults() {
    return this.gifsService.searchResults;
  }

  constructor(public gifsService: GifsService) {}

}
