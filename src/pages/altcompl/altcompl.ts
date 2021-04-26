import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController , AlertController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { RequestOptions , Headers } from '@angular/http';
/**
 * Generated class for the AltcomplPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-altcompl',
  templateUrl: 'altcompl.html',
})
export class AltcomplPage 
{

  private options:any;
  private headers:any;
  private data:any; 

  private codprod:string='';
  private descprod:string='';
  private prodfor:string='';
  private recno:string='';
  private tipo:string='';
  private unidade:string='';
  private conta:string='';
  private cc:string='';
  private origem:string='';
  private grupo:string='';

  private loader;
  private testRadioOpen;

  public lista_status = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams , private centralProvider:CentralProvider , public loadingCtrl:LoadingController , public alertCtrl: AlertController) 
  {

    this.codprod  = navParams.get("codprod");
    this.descprod = navParams.get("descricao");
    this.prodfor  = navParams.get("prodfor");    
    this.recno    = navParams.get("recno");   

  }

  ionViewDidLoad() 
  {
    
  }

  altCompl()
  {

    this.abreCarregando();
    var url = this.centralProvider.baseApiPath + "/detcomplapl/"

    this.headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      this.options = new RequestOptions({ headers: this.headers });
      
      this.data = JSON.stringify({
        recno: this.recno,
        prodfor: this.prodfor.toUpperCase()

      });

    this.data = this.centralProvider.http.put(url , this.data , this.options ).toPromise().then((response) =>
    {
      //console.log('API Response : ', response);
      const objeto_retorno = JSON.parse(JSON.stringify(response)); 
      this.lista_status = objeto_retorno;
      this.fechaCarregando();

      if(this.lista_status[0].codigo=="01")
      {
        this.mostraOk();
      }
      else
      {
        this.mostraErro();
      }


    })
    .catch((error) =>
    {
      this.fechaCarregando();
      this.mostraConexao();
      //console.error('API Error : ', error.status);
      //console.error('API Error : ', JSON.stringify(error));
    });
        

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

  mostraOk() 
  {
    const alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: this.lista_status[0].status,
      buttons: ['OK']
    });
    alert.present();
    this.close();
  }  
  
  mostraErro() 
  {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: this.lista_status[0].status,
      buttons: ['OK']
    });
    alert.present();
  }

  mostraConexao()
  {
    const alert = this.alertCtrl.create({
      title: 'Ops',
      subTitle: "Houve um erro na conexão com o ERP!",
      buttons: ['OK']
    });
    alert.present();    
  } 

  close() 
  {
    this.navCtrl.pop();
  }   

}
