import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DignotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dignota',
  templateUrl: 'dignota.html',
})
export class DignotaPage {

  chaveNf:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {

  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad DignotaPage');
  }

}
