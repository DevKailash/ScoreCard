import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File} from '@ionic-native/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements OnInit {
  imageUrl:any;
  storedDetails:any;
  // storedPhoto:any;
  constructor(private camera: Camera, 
    private file: File,
    private sanitizer: DomSanitizer,
    private webview: WebView,
    ) { }

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
    alert("access check::"+JSON.stringify(this.storedDetails));
    if(this.storedDetails){
      this.storedDetails = JSON.parse(this.storedDetails);
      this.deleteImg(this.storedDetails.url,this.storedDetails.name);
    }else{
      this.openCamera();
    }    
  }
  async openCamera(){
    this.imageUrl = '';
    const options: CameraOptions = {
      quality: 50,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {

        const filename = imageData.substring(imageData.lastIndexOf('/')+1);
        const path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
        const fullPath = path+filename;
        this.viewImg(fullPath);
          let storedPhoto = {
            url: path,
            name: filename
          }
          window.localStorage.setItem("storedImg",JSON.stringify(storedPhoto));
    }, (err) => {
    });

    // const dataDirectoryPath = this.file.dataDirectory;
    

  }
  viewImg(path){
    const resolvedImg = this.webview.convertFileSrc(path);
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
  }
  deleteImg(filepath, fileName) {
    // Removing img from application catch;
    this.file.removeFile(filepath, fileName);
    // alert("deleteImg");
    this.openCamera();
  }

}
