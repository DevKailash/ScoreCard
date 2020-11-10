import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraPriviewPageRoutingModule } from './camera-priview-routing.module';

import { CameraPriviewPage } from './camera-priview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraPriviewPageRoutingModule
  ],
  declarations: [CameraPriviewPage]
})
export class CameraPriviewPageModule {}
