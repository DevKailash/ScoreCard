import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File} from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { ActionSheetController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Router, NavigationExtras } from '@angular/router';
import { Crop } from '@ionic-native/crop/ngx';
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
  // crop imge
  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  constructor(private camera: Camera, 
    private file: File,
    private sanitizer: DomSanitizer,
    private webview: WebView,public alertController: AlertController,
    private router: Router,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    ) { 
    }
    // Getting current date and gallery last array index
  ngOnInit() {
    this.currentDate =  moment().format('DD-MMM-YY');
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
      targetWidth: 600,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      let formatedData;
      this.base64Img = 'data:image/jpeg;base64,' + imageData;
      formatedData = {
        imageData: this.base64Img,
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
  goSlider(){
    this.router.navigate(['/slider']);

  }


  // Crop image

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cropImage(imageData)
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      this.isLoading = false;
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });
  }
  
}
