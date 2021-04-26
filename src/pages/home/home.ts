import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScannotaPage } from '../scannota/scannota';
import { DignotaPage } from '../dignota/dignota';
import { BuscaprdPage } from '../buscaprd/buscaprd';
import { BuscacomplPage } from '../buscacompl/buscacompl';
import { BuscaforPage } from '../buscafor/buscafor';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) 
  {

  }

  abreScan() 
  {
    this.navCtrl.push(ScannotaPage,{});
  }  


  abreDigita() 
  {
    this.navCtrl.push(DignotaPage,{});
  }  

  abreProdutos() 
  {
    this.navCtrl.push(BuscaprdPage,{});
  }    

  abreCompl() 
  {
    this.navCtrl.push(BuscacomplPage,{});
  }     

  abreForn() 
  {
    this.navCtrl.push(BuscaforPage,{});
  }   

}
