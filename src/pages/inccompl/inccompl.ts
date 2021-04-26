import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , AlertController , LoadingController } from 'ionic-angular';
import { RequestOptions , Headers } from '@angular/http';
import { CentralProvider } from '../../providers/central/central';

/**
 * Generated class for the InccomplPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inccompl',
  templateUrl: 'inccompl.html',
})
export class InccomplPage 
{

  public lista_status = new Array<any>();

  private loader;  

  private codprod:string='';
  private codfor:string='';
  private loja:string='';
  private prodfor:string='';

  private testRadioOpen: boolean;
  private tudook:boolean=true;
  private msg:string='';

  private options:any;
  private headers:any;
  private data:any;   


  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController ,  public alertCtrl: AlertController  , private centralProvider:CentralProvider , public loadingCtrl:LoadingController ) 
  {
    this.codfor = navParams.get("codfor");
    this.loja = navParams.get("loja");    
  }

  ionViewDidLoad() 
  {
    
  }

  incCompl()
  {
    var url = this.centralProvider.baseApiPath + "/detcomplapl/"//http://localhost:8050/REST/DETPRODAPL";
    this.headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      this.options = new RequestOptions({ headers: this.headers });
      
      this.data = JSON.stringify({
        codprod: this.codprod.toUpperCase(),
        codfor: this.codfor.toUpperCase(),
        loja: this.loja.toUpperCase(),
        prodfor: this.prodfor.toUpperCase()
      });
    //let postData  = new FormData();;
    //postData.append('email','nelson.bretasjr@gmail.com');
    
    this.tudook = true;

    if(this.prodfor=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Produto no Fornecedor";
    }
    
    if(this.codprod=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Produto";
    }     
  

    if(this.tudook==true)
    {
        this.abreCarregando();
        this.data = this.centralProvider.http.post(url , this.data , this.options ).toPromise().then((response) =>
        {
          //console.log('API Response : ', response);
          const objeto_retorno = JSON.parse(JSON.stringify(response)); 
          this.lista_status = objeto_retorno;
          //console.log(this.lista_status[0].status);
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
    else
    {
      this.validaCampos();
    }
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
  
  validaCampos()
  {
    const alert = this.alertCtrl.create({
      title: 'Obrigatório!',
      subTitle: this.msg,
      buttons: ['OK']
    });
    alert.present();    
  }

  close() 
  {
    this.viewCtrl.dismiss();
  }   

}
