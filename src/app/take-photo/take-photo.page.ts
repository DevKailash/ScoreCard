import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File} from '@ionic-native/file/ngx'

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements OnInit {
  imageUrl:any;
  storedDetails:any;
  // storedPhoto:any;
  constructor(private camera: Camera, private file: File) { }

  ngOnInit() {
    this.storedDetails = window.localStorage.getItem("storedImg");
    if(this.storedDetails){
      this.storedDetails = JSON.parse(this.storedDetails);
      this.file.readAsDataURL(this.storedDetails.url, this.storedDetails.name).then(res=>{
        this.imageUrl.pic = res;
      });
      // this.imageUrl = (<any>window).Ionic.WebView.convertFileSrc();
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
    // alert("openCamera");
    this.imageUrl = '';
    const options: CameraOptions = {
      quality: 50,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {

        var filename = imageData.substring(imageData.lastIndexOf('/')+1);
        var path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
          this.file.readAsDataURL(path, filename).then(res=>{
            this.imageUrl.pic = res;
          });
          let storedPhoto = {
            url: path,
            name: filename
          }
          window.localStorage.setItem("storedImg",JSON.stringify(storedPhoto));
    }, (err) => {
    });

    // const dataDirectoryPath = this.file.dataDirectory;
    

  }
  deleteImg(filepath, fileName) {
    // Removing img from application catch;
    this.file.removeFile(filepath, fileName);
    alert("deleteImg");
    this.openCamera();
  }

}
