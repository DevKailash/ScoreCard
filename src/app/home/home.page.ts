import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scorecard:any;
  you_scrored:any;
  constructor(private api:ApiService) {}
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
        //  console.log(element);
         element.question_answers =  Object.values(element.question_answers);
       });
       console.log(this.scorecard);
     } );
 }
}
