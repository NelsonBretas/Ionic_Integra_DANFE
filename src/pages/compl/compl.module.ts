import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplPage } from './compl';

@NgModule({
  declarations: [
    ComplPage,
  ],
  imports: [
    IonicPageModule.forChild(ComplPage),
  ],
})
export class ComplPageModule {}
