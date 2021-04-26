import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController } from 'ionic-angular';
import { BarcodeScanner , BarcodeScannerOptions } from '@ionic-native/barcode-scanner';//npm i -s @ionic-native/barcode-scanner@4.20.0 

/**
 * Generated class for the ScannotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scannota',
  templateUrl: 'scannota.html',
})
export class ScannotaPage 
{
  public chaveNf:any='';
  options:BarcodeScannerOptions;
  encodedText:string='';
  encodedData:any={};
  scannedData:any={};  

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController , public scanner: BarcodeScanner) 
  {

  }

  ionViewDidLoad() 
  {
    this.scan();  
  }

  scan()
  {
    this.options = {
      prompt: "Escaneie a chave da nota!",
      showFlipCameraButton:true,
      orientation:"landscape"
    };
    this.scanner.scan(this.options).then((data) => {
      this.chaveNf = data;
      /*
      if(this.chaveNf.text=="")
      {
        this.chaveNf = 'Chave não encontrada!';
      }

      this.chaveNf = this.chaveNf.text.lenght; */
      
     }).catch(err => {
         console.log('Error', err);
     });
  }  

  close() 
  {
    //this.navCtrl.setRoot(SolicitacaoCodigoPage); ou 
    //this.navCtrl.pop();
    //this.navCtrl.push(RegisterPage);
    this.viewCtrl.dismiss();
  }  

}
