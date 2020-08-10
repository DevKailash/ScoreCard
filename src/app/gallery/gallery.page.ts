import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  cameraData:any;
  imgDetails:any=[];
  constructor(private router: Router,) { }

  ngOnInit() {
    this.router.routerState.root.queryParams.subscribe(params => {
      this.cameraData = JSON.parse( params.camera);
      this.getImgDetails(this.cameraData);
    });
  }

  getImgDetails(cameraData) {
    let gallery = null;
     try{
      gallery = JSON.parse(window.localStorage.getItem("gallery"));
    }catch(err){}
    if(!gallery){
      this.imgDetails.push(cameraData);
      window.localStorage.setItem('imgIndex','1');
    }else{
      let len = gallery.length;
      this.imgDetails = gallery;
      this.imgDetails.push(cameraData);
      window.localStorage.setItem('imgIndex',JSON.stringify(len+1));
    }
    window.localStorage.setItem('gallery', JSON.stringify(this.imgDetails));
  }
  backToTakePhoto(){
    this.router.navigate(['/takePhoto']);
  }
}
