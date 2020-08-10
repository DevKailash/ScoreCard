import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File} from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements OnInit {
  galleryType = 'regular';
  base64Img:any;
  currentDate;
  imageUrl:any;
  storedDetails:any;
  imgIndex:number= 0;
  constructor(private camera: Camera, 
    private file: File,
    private sanitizer: DomSanitizer,
    private webview: WebView,public alertController: AlertController,
    private router: Router,
    ) { 
    }
    // Getting current date and gallery last array index
  ngOnInit() {
    this.currentDate =  moment().format('DD-MMM-YY');
    try{this.imgIndex = JSON.parse(window.localStorage.getItem('imgIndex'))}catch(err){this.imgIndex = 0;}
  }
  // open camera and take picture with img formate of base64 
  async openCamera(){
    this.imageUrl = '';
    const options: CameraOptions = {
      quality: 50,
      // saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
      let formatedData;
      this.base64Img = 'data:image/jpeg;base64,' + imageData;
      formatedData = {
        id:this.imgIndex+1,
        imageData: this.base64Img,
        imageName: 'img-'+this.imgIndex+1+'-'+this.currentDate,
        date:this.currentDate 
      }
      this.redirectToGallery(formatedData);
    }, (err) => {
    }); 
  }
  // page redirect to gallery page
  redirectToGallery(formatedData){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        camera: JSON.stringify(formatedData)
      }
    };
    this.router.navigate(['/gallery'], navigationExtras);
  }

  viewImg(path){
    //view file uri image
    const resolvedImg = this.webview.convertFileSrc(path);
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
  }
  
}
