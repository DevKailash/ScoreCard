import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File} from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx'
import { AlertController } from '@ionic/angular';
import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements OnInit {
  @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
  cropperOptions: any;
  croppedImage = null;

  myImage = null;
  scaleValX = 1;
  scaleValY = 1;

  imageUrl:any;
  storedDetails:any;
  constructor(private camera: Camera, 
    private file: File,
    private sanitizer: DomSanitizer,
    private webview: WebView,public alertController: AlertController
    ) { 
      this.cropperOptions = {
        dragMode: 'crop',
        aspectRatio: 1,
        autoCrop: true,
        movable: true,
        zoomable: true,
        scalable: true,
        autoCropArea: 0.8,
      };
    }

  ngOnInit() {
    this.storedDetails = window.localStorage.getItem("storedImg");
    if(this.storedDetails){
      this.storedDetails = JSON.parse(this.storedDetails);
      let fullPath = this.storedDetails.url+this.storedDetails.name;
      this.viewImg(fullPath);
    }
  }
// After take picture close and reopen the application also will remove the already take picture.
  async accessCamera(){
    this.storedDetails = window.localStorage.getItem("storedImg");
    if(this.storedDetails){
      this.storedDetails = JSON.parse(this.storedDetails);
      this.deleteImg(this.storedDetails.url,this.storedDetails.name);
    }else{
      this.openCamera();
    }    
  }
  async openCamera(){
    //open camera and take picture
    this.imageUrl = '';
    const options: CameraOptions = {
      quality: 50,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myImage = 'data:image/jpeg;base64,' + imageData;
        // const filename = imageData.substring(imageData.lastIndexOf('/')+1);
        // const path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
        // const fullPath = path+filename;
        // this.viewImg(fullPath);
        //   let storedPhoto = {
        //     url: path,
        //     name: filename
        //   }
        //   window.localStorage.setItem("storedImg",JSON.stringify(storedPhoto));
    }, (err) => {
    }); 
  }

  reset() {
    this.angularCropper.cropper.reset();
  }

  clear() {
    this.angularCropper.cropper.clear();
  }

  rotate() {
    this.angularCropper.cropper.rotate(90);
  }

  zoom(zoomIn: boolean) {
    let factor = zoomIn ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(factor);
  }

  scaleX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
  }

  scaleY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }

  move(x, y) {
    this.angularCropper.cropper.move(x, y);
  }

  save() {
    let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', (100 / 100));
    this.croppedImage = croppedImgB64String;
  }

  viewImg(path){
    //view file uri image
    const resolvedImg = this.webview.convertFileSrc(path);
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
  }
  deleteImg(filepath, fileName) {
    // Removing img from application catch;
    this.file.removeFile(filepath, fileName);
    this.openCamera();
  }
  
}
