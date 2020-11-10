import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import Cropper from 'cropperjs';
@Component({
  selector: 'app-camera-priview',
  templateUrl: './camera-priview.page.html',
  styleUrls: ['./camera-priview.page.scss'],
})
export class CameraPriviewPage implements OnInit {
  smallPreview: boolean;
  takenImge: any;
  colorEffect = 'none';
  setZoom = 1;
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
  constructor(
    private cameraPreview: CameraPreview
  ) { }


  ngOnInit() {
    this.startCameraAbove();
  }
  cropeImg(){
    let path:any = document.getElementById('cropeIm');
    let cropper:any = new Cropper(path, {
      autoCrop: true,
      autoCropArea: 6,
      aspectRatio: 800 / 400,
      // minCropBoxWidth: 400,
      // minCropBoxHeight: 800,
      viewMode: 1,
      ready: function() {
          // generatePreview();
      }
  });
  cropper.minWidth = 160;
  cropper.minWidth = 90;
  }
  startCameraAbove() {
    
    try {
      this.cameraPreview.stopCamera().then(() => {
        // this.cameraPreview.startCamera(this.cameraPreviewOpts);
      })
    } catch (error) {
      
    }
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
    });
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
  }

  takePicture() {
    this.cameraPreview.takePicture({
      width: 1280,
      height: 1280,
      quality: 85
    }).then((imageData) => {
      this.takenImge = 'data:image/jpeg;base64,' + imageData;
      this.stopCamera();
    }, (err) => {
      console.log(err);
      this.takenImge = 'assets/img/404.png';
      this.stopCamera();
    });
  }
  retakeImge(){
    this.takenImge = '';
    this.startCameraAbove();
  }
  switchCamera() {
    this.cameraPreview.switchCamera();
  }


  changeZoom() {
    this.cameraPreview.setZoom(this.setZoom);
  }
}
