import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DignotaPage } from './dignota';

@NgModule({
  declarations: [
    DignotaPage,
  ],
  imports: [
    IonicPageModule.forChild(DignotaPage),
  ],
})
export class DignotaPageModule {}
