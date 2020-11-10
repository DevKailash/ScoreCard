import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomePage,
    children: [
        {
            path: 'one',
            outlet: 'one',
            loadChildren: () => import('../weather/weather.module').then( m => m.WeatherPageModule)
        },
        {
            path: 'two',
            outlet: 'two',
            loadChildren: () => import('../take-photo/take-photo.module').then( m => m.TakePhotoPageModule)

        },
        {
            path: 'three',
            outlet: 'three',
            loadChildren: () => import('../score/score.module').then( m => m.ScorePageModule)
        },
        {
          path: '',
          redirectTo: 'one'        
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
