import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraPriviewPage } from './camera-priview.page';

const routes: Routes = [
  {
    path: '',
    component: CameraPriviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraPriviewPageRoutingModule {}
