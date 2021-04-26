import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController , AlertController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { RequestOptions , Headers } from '@angular/http';

/**
 * Generated class for the AltforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-altfor',
  templateUrl: 'altfor.html',
})
export class AltforPage 
{

  private options:any;
  private headers:any;
  private data:any; 

  private codfor:string='';
  private loja:string='';
  private nome:string='';
  private nreduz:string='';
  private endereco:string='';
  private complemento:string='';  
  private bairro:string='';
  private estado:string='';
  private municipio:string='';
  private cep:string='';
  private tipofor:string='';
  private cnpj:string='';
  private telefone:string='';
  private ie:string='';
  private email:string='';

  private loader;
  private testRadioOpen;

  public lista_status = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams , private centralProvider:CentralProvider , public loadingCtrl:LoadingController , public alertCtrl: AlertController) 
  {
    this.codfor = navParams.get("codfor");
    this.loja = navParams.get("loja");
    this.nome = navParams.get("nome");
    this.nreduz  = navParams.get("nreduz");
    this.endereco = navParams.get("endereco");
    this.complemento = navParams.get("complemento");
    this.bairro = navParams.get("bairro");
    this.estado = navParams.get("estado");
    this.municipio = navParams.get("municipio");
    this.cep = navParams.get("cep");
    this.tipofor = navParams.get("tipofor");
    this.cnpj = navParams.get("cnpj");
    this.telefone = navParams.get("telefone");
    this.ie = navParams.get("ie");
    this.email = navParams.get("email");    
  }

  ionViewDidLoad() 
  {
    
  }

  altForn()
  {

    this.abreCarregando();
    var url = this.centralProvider.baseApiPath + "/detfornapl/"//http://localhost:8050/REST/DETPRODAPL";

    this.headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      this.options = new RequestOptions({ headers: this.headers });
      
      this.data = JSON.stringify({
        codfor: this.codfor.toUpperCase(),
        loja: this.loja.toUpperCase(),
        nome: this.nome.toUpperCase(),
        nreduz: this.nreduz.toUpperCase(),
        endereco: this.endereco.toUpperCase(),
        complemento: this.complemento.toUpperCase(),
        cnpj: this.cnpj.toUpperCase(),
        bairro: this.bairro.toUpperCase(),
        estado: this.estado.toUpperCase(),
        municipio: this.municipio.toUpperCase(),
        cep: this.cep.toUpperCase(),
        tipofor : this.tipofor.toUpperCase(),
        telefone: this.telefone.toUpperCase(),
        ie: this.ie.toUpperCase(),
        email: this.email.toUpperCase()
      });

    this.data = this.centralProvider.http.put(url , this.data , this.options ).toPromise().then((response) =>
    {
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
  
  showTipo() 
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Tipo de Fornecedor');

    alert.addInput(
    {
      type: 'radio',
      label: 'Fisica',
      value: 'F',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Juridica',
      value: 'J',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Outros',
      value: 'X',
      checked: false
    });      
            

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.tipofor = data;
        
      }
    });
    alert.present();
    
  }  

}
