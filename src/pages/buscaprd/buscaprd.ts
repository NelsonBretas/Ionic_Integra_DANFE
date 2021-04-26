import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController , ModalController } from 'ionic-angular';
import { ProdutosPage } from '../produtos/produtos';
import { IncprdPage } from '../incprd/incprd';



/**
 * Generated class for the BuscaprdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscaprd',
  templateUrl: 'buscaprd.html',
})
export class BuscaprdPage 
{

  testRadioOpen: boolean;
  testRadioResult:string='1';
  pesquisa:string='Código';
  private getponteiro:string='';



  constructor(public navCtrl: NavController, public navParams: NavParams , public alertCtrl: AlertController , public modalCtrl: ModalController) 
  {

  }

  ionViewDidLoad() 
  {
    
  }

  showRadio() 
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Consultar por');

    alert.addInput(
    {
      type: 'radio',
      label: 'Código',
      value: '1',
      checked: true
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Descrição',
      value: '2',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'NCM',
      value: '3',
      checked: false
    });      

    alert.addInput(
    {
      type: 'radio',
      label: 'Grupo',
      value: '4',
      checked: false
    });          

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.alteraPesq();
      }
    });
    alert.present();
    
  }
  
  alteraPesq()
  {
    
    if(this.testRadioResult=="1")
    {
      this.pesquisa = "Código";
    }
    else if(this.testRadioResult=="2")
    {
      this.pesquisa = "Descrição";
    }
    else if(this.testRadioResult == "3")
    {
      this.pesquisa = "NCM";
    }
    else if(this.testRadioResult == "4")
    {
      this.pesquisa = "Grupo";
    }
    else
    {
      this.pesquisa = "";
    }

  }


  abreResults()
  {
    if(this.getponteiro=="")
    {
        const alert = this.alertCtrl.create({
          title: 'Atenção!',
          subTitle: 'Preencha algo para a busca!',
          buttons: ['OK']
        });
        alert.present();

    }
    else
    {
      this.navCtrl.push(ProdutosPage,{
        tipo:this.testRadioResult,
        ponteiro:this.getponteiro.toUpperCase()
      });
    }

  }


  abreInc()
  {

    let profileModal = this.modalCtrl.create(IncprdPage);
    profileModal.present();


  }       
  

}
