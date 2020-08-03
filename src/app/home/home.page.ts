import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scorecard:any;
  you_scrored:any;
  isWeather = true;
  isScore = false;
  constructor(private api:ApiService, private router: Router,  private AngAuth:AngularFireAuth) {}
  ngOnInit(){
    this.getScore();
    console.log("calling api");
  }
  async getScore() {
      await this.api.getscorecard('scorecard')
      .subscribe((res: any) =>{
        let response:any;
        response = JSON.parse(res);
        if(response.status == 200){
          this.scorecard = Array.of(response.data);
        }
        this.scorecard[0].scorecard.forEach(element => {
          element.question_answers =  Object.values(element.question_answers);
        });
        console.log(this.scorecard);
      } );
  }
  navigate(){
      this.router.navigate(['/takePhoto']);
  }
  async logOut(){
    await this.AngAuth.signOut()
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
  }
  changeTemplate(name){
    if(name == 'score'){
      this.isScore = true;
      this.isWeather = false;
    }
    if(name == 'weather'){
      this.isWeather = true;
      this.isScore = false;
    }
  }
}
