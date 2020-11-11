import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { LoadingController, PopoverController } from '@ionic/angular';
import Cropper from 'cropperjs';
import { InstructionComponent } from "./instruction/instruction.component"
@Component({
  selector: 'app-camera-priview',
  templateUrl: './camera-priview.page.html',
  styleUrls: ['./camera-priview.page.scss'],
})
export class CameraPriviewPage implements OnInit {
  takenImge: any;
  setZoom = 1;
  x_axis = 0;
  y_axis = 0;
  rectange_width = 0;
  rectange_height = 0;
  // window.screen.width
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: false,
    previewDrag: false,
    toBack: true,
    alpha: 1
  };
  popover;
  constructor(
    private cameraPreview: CameraPreview,public popoverController: PopoverController
  ) { }


  ngOnInit() {
    
  }

  // getting frame postitons and (width & height) then set positions,width and height for camera view.
  ionViewDidEnter(){
    setTimeout(() => {
      let element = document.getElementById('borderFrame');
      let position = element.getBoundingClientRect();
      this.x_axis = position.left;
      this.y_axis = position.top;
      this.rectange_width = element.offsetWidth;
      this.rectange_height = element.offsetHeight;

      // applying in camera
      this.cameraPreviewOpts.width = this.rectange_width;
      this.cameraPreviewOpts.height = this.rectange_height;
      this.cameraPreviewOpts.x = this.x_axis;
      this.cameraPreviewOpts.y = this.y_axis;
      
      this.startCameraAbove();
    }, 200);
  }

  //close pop over when pop over opened and click back.
  ionViewWillLeave(){
    try {
      this.popover.dismiss();
    } catch (error) {
      
    }
  }
  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: InstructionComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await this.popover.present();
  }
  // Cropping image based on inside frame (now We are not using this.)
  cropeImg(){
    this.stopCamera();
    setTimeout(() => {
      let img:any = document.getElementById("croppingImg");
      let left = (img.offsetWidth-this.rectange_width);
      let top = (img.offsetHeight-this.rectange_height);
      let width = (img.offsetWidth+this.rectange_width); 
      let height = (img.offsetHeight+this.rectange_height);
      console.log(left, this.x_axis, top, this.y_axis);
      // let ImgOptions = img.getBoundingClientRect();
      let canvas:any = document.getElementById("myCanvas"); 
      let contex = canvas.getContext("2d"); 
      // contex.drawImage(img, this.x_axis*2, this.y_axis*2, this.rectange_width*2, this.rectange_height*2, 0, 0, this.rectange_width, this.rectange_height);
      // contex.drawImage(img, this.x_axis*2.2, this.y_axis*2.1, window.screen.width*(this.rectange_width/100), window.screen.height*(this.rectange_height/100), 0, 0, this.rectange_width, this.rectange_height);
      contex.drawImage(img, left+this.x_axis,top+this.y_axis, width, height, -10, 0, this.rectange_width+50, this.rectange_height+50);
      const base64Canvas = contex.toDataURL("image/png").split(';base64,')[1]; 
      console.log(base64Canvas);
    }, 1000);
    
  }
  
  // open the camera periview
  startCameraAbove() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
    });
  }
// take the picture function
  takePicture() {
    this.cameraPreview.takePicture({
      width: 1280,
      height: 1280,
      quality: 75
    }).then((imageData) => {
      this.takenImge = 'data:image/jpeg;base64,' + imageData;
      // this.cropeImg();
      this.stopCamera();
    }, (err) => {
      console.log(err);
      this.takenImge = 'assets/img/404.png';
      this.stopCamera();
    });
  }
  // clear the old image and call the camera.
  retakeImge(){
    this.takenImge = '';
    this.startCameraAbove();
  }
  // switch the camera front & back
  switchCamera() {
    this.cameraPreview.switchCamera();
  }
  // Zoom the camera.
  changeZoom() {
    this.cameraPreview.setZoom(this.setZoom);
  }
  // stop the camera periview.
  stopCamera() {
    this.cameraPreview.stopCamera();
  }
}
