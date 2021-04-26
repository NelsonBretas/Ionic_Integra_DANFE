import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , LoadingController , AlertController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { DetcomplPage } from '../detcompl/detcompl';
import { InccomplPage } from '../inccompl/inccompl';
/**
 * Generated class for the ComplPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compl',
  templateUrl: 'compl.html',
})
export class ComplPage 
{

  private loader;
  private tipo:string='';
  private ponteiro:string='';
  private imagem:string='https://via.placeholder.com/150/2a89a8/FFFFFF/?text=';

  private codigo:string='';
  private nome:string='';
  private _tipo:string=''; 
  
  public lista_fornecedores = new Array<any>();
  public copia_fornecedores = new Array<any>();
  public searchQuery: string = '';  

  constructor(public navCtrl: NavController, public navParams: NavParams , private centralProvider:CentralProvider , public modalCtrl: ModalController , public loadingCtrl:LoadingController , public alertCtrl: AlertController) 
  {
    this.tipo = navParams.get("tipo");
    this.ponteiro = navParams.get("ponteiro");
  }



  ionViewDidLoad() 
  {
    this.abreCarregando();
    this.centralProvider.getCompl(this.tipo , this. ponteiro).subscribe(
      data=>
      {
        const response = (data as any);
        const objeto_retorno = JSON.parse(JSON.stringify(response));         

        if(objeto_retorno[0].codigo=="Produto Nao Encontrado!")
        {
          this.mostraErro();

        }
        else
        {

          this.lista_fornecedores = objeto_retorno;
          this.copia_fornecedores = this.lista_fornecedores;
          this.nome = this.lista_fornecedores[0].nome;
        }
      }
    )
    this.fechaCarregando();
  }

  mostraErro() 
  {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Não existem amarrações para este fornecedor!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }  

  abreCarregando()
  {    
    this.loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loader.present();

  }
  
  fechaCarregando()
  {
    this.loader.dismiss();
  }  

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.lista_fornecedores = this.copia_fornecedores;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') 
    {
      this.lista_fornecedores = this.lista_fornecedores.filter((lista_fornecedores) => {
        return (lista_fornecedores.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getDados(_recno)
  {

    let profileModal = this.modalCtrl.create(DetcomplPage , {
      
      recno: _recno

      
    });
    profileModal.present();

  }
  

  abreInc()
  {
    let profileModal = this.modalCtrl.create(InccomplPage,{      
      codfor: this.lista_fornecedores[0].codfor,
      loja: this.lista_fornecedores[0].loja
    });
    profileModal.present();
  }     

}
