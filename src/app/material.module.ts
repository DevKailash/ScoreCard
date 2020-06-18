import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  exports: [
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule
  ]
})
export class MaterialModule { }
