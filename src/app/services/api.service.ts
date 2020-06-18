import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getscorecard(filename: string): Observable<any> {
    return this.httpClient.get("assets/mock/" + filename + ".json",{responseType: 'text'});
  }
}
