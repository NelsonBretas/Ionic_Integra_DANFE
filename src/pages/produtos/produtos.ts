import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController , LoadingController , AlertController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { DetprodPage } from '../detprod/detprod';
import { IfObservable } from 'rxjs/observable/IfObservable';


/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage 
{

  private loader;
  private tipo:string='';
  private ponteiro:string='';
  private imagem:string='https://via.placeholder.com/150/2a89a8/FFFFFF/?text=';

  //chamada das variaveis de retorno do ERP
  private codigo:string='';
  private descricao:string='';
  private _tipo:string='';


  public lista_produtos = new Array<any>();
  public copia_produtos = new Array<any>();
  public searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams , private centralProvider:CentralProvider , public modalCtrl: ModalController , public loadingCtrl:LoadingController , public alertCtrl: AlertController) 
  {
    this.tipo = navParams.get("tipo");
    this.ponteiro = navParams.get("ponteiro");
  }

  public ionViewDidLoad() 
  {
    this.abreCarregando();
    this.centralProvider.getProduto(this.tipo , this. ponteiro).subscribe(
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
          this.lista_produtos = objeto_retorno;
          this.copia_produtos = this.lista_produtos;
        }
      }
    )
    this.fechaCarregando();
  }

  mostraErro() 
  {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Produto Não Encontrado!',
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
    this.lista_produtos = this.copia_produtos;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') 
    {
      this.lista_produtos = this.lista_produtos.filter((lista_produtos) => {
        return (lista_produtos.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getDados(_codprod  )
  {

    let profileModal = this.modalCtrl.create(DetprodPage , {
      
      codprod: _codprod
      
    });
    profileModal.present();

  }

}