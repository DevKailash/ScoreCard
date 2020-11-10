import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform,
  ) {
    this.platform.ready().then(async () => {
      const accesstoken = localStorage.getItem('accesstoken');
      return await this.authenticated.next(accesstoken ? true : false);
    });
  }
  async checkAuth(){
    const accesstoken = localStorage.getItem('accesstoken');
      return await this.authenticated.next(accesstoken ? true : false);
  }
  isAuthenticated() {
    this.checkAuth();
    return this.authenticated.value;
  }

  public getAuthentication(): Observable<boolean> {
    return this.authenticated.asObservable();
  }
}
