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
  // storedPhoto:any;
  constructor(private camera: Camera, private file: File) { }

  ngOnInit() {
  }
// After take picture close and reopen the application also will remove the already take picture.
  async accessCamera(){
    console.log("Accessing camera!");
    const storedDetails:any = JSON.parse(window.localStorage.getItem("storedImg"));
    console.log("path:",storedDetails);
    alert(JSON.stringify(storedDetails));
    if(storedDetails){
      this.deleteImg(storedDetails.url,storedDetails.name);
    }else{
      this.openCamera();
    }    
  }
  async openCamera(){
    alert("openCamera");
    this.imageUrl = '';
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    const tempImage = await this.camera.getPicture(options);
    this.imageUrl = tempImage;
    const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
    console.log(tempFilename);
    const tempImgPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);

    const dataDirectoryPath = this.file.dataDirectory;

    await this.file.copyFile(tempImgPath, tempFilename, 
      dataDirectoryPath, tempFilename);

    // this.storedPhoto = dataDirectoryPath + tempFilename;
    let storedPhoto = {
      url: dataDirectoryPath,
      name: tempFilename
    }
    window.localStorage.setItem("storedImg",JSON.stringify(storedPhoto));

  }
  deleteImg(filepath, fileName) {
    // remove img from application catch;
    this.file.removeFile(filepath, fileName).then(()=>{
      this.openCamera();
    });
  }

}
