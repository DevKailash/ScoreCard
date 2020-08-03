import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../services/api-configuration';
import { Observable as __Observable, throwError, from } from 'rxjs';
import { map as __map, filter as __filter, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appid = "appid=076c1a1abaf289eb198304252a1900e0";
  constructor(private httpClient: HttpClient, protected config: ApiConfiguration) { }

  public getscorecard(filename: string): __Observable<any> {
    return this.httpClient.get("assets/mock/" + filename + ".json",{responseType: 'text'});
  }
  public getlocalWeather(filename: string): __Observable<any> {
    return this.httpClient.get("assets/mock/" + filename + ".json",{responseType: 'text'});
  }
  // Get weather details from server
  public getWeatherDetails(req: any): __Observable<[]> {
    let api;
    // console.log(req);
    // if(req.state === 'Current'){
    //   api = `${this.config.current}${req.name}&${this.appid}`
    // }
    api = `${this.config.current}${req}&${this.appid}`
    return this.httpClient.get<[]>(api, {responseType: 'json'})
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }
   // Error handling 
  handleError(error) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
  }
}
