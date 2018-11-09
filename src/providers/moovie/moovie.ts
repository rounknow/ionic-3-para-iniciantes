import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider 
{

  public baseAPIPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) 
  {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies(page = 1)
  {
    return this.http.get(this.baseAPIPath + `/movie/popular?page=${page}&api_key=` + this.getAPIKey());
  }

  getMovieDetails(filmeId)
  {
     return this.http.get(this.baseAPIPath + `/movie/${filmeId}?api_key=` + this.getAPIKey());
  }

  getAPIKey() : string
  {
    return "a626ef90306349eca33ef6048c2c9e1b";
  }
}
