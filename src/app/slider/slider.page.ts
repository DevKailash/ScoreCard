import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
  slideOpts = {
    // spaceBetween:10,
    // centredSlides:true,
    // slidesPerView:1.1,
    // // initialSlide: 1,
    // speed: 400
    spaceBetween: 0,
    slidesPerView: 2.15,
    
  };
  slideOpts2 = {
    spaceBetween: 0,
    slidesPerView: 1.15,
  };
  Details;
  constructor(private router: Router) { }

  ngOnInit() {
    this.Details = [{
      img: 'https://www.foodbev.com/wp-content/uploads/2019/04/carlsberg-pilsner-rebrewed-6.jpg',
      text:'Sample Text',
      sub: "Beer"
    },{
      img: 'https://api.time.com/wp-content/uploads/2020/02/corona-beer-virus-.jpg?quality=85&w=1024&h=628&crop=1',
      text:'Sample Text',
      sub:"Beer"
    },{
      img: 'https://buffer.com/library/content/images/library/wp-content/uploads/2017/09/13-Places-to-Find-Background-Music-for-Video-Cover-Image-2.jpg',
      text:'Sample Text',
      sub:"Music"
    },{
      img: 'https://s3.envato.com/files/231264885/preview.jpg',
      text:'Sample Text',
      sub:"Beer"
    },{
      img: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fteresafinney%2Ffiles%2F2018%2F11%2Fimage001.jpg',
      text:'Sample Text',
      sub:"Beer"
    },{
      img: 'https://www.adgully.com/img/800/201805/vdd.jpg',
      text:'Sample Text',
      sub:"Good Day"
    }]
  }
  pageRedirection(){
    this.router.navigate(['/stepper']);
  }
}
