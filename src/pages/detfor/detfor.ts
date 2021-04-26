import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , AlertController  , Platform , LoadingController , ActionSheetController , ModalController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { AltforPage } from '../altfor/altfor';


/**
 * Generated class for the DetforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detfor',
  templateUrl: 'detfor.html',
})
export class DetforPage 
{

  public lista_fornecedores = new Array<any>();
  public lista_status = new Array<any>();
  private postData;
  private tudook:boolean=false;
  private isReadonly:boolean=false;
  
  private modelo:any;
  private loader;
  private data:any;
  private headers:any;
  private options:any;  

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

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController , private centralProvider:CentralProvider , public loadingCtrl:LoadingController , public actionsheetCtrl: ActionSheetController , public platform: Platform , public alertCtrl: AlertController , public modalCtrl: ModalController) 
  {
    this.codfor    = navParams.get("codfor");
    this.loja      = navParams.get("loja");
  }

  ionViewDidLoad() 
  {
    this.abreCarregando();
    this.centralProvider.getFornDet(this.codfor.toUpperCase(),this.loja).subscribe(
      data=>
      {
        const response = (data as any);
        
        const objeto_retorno = JSON.parse(JSON.stringify(response)); 

        if(objeto_retorno[0].codigo=="NAO ENCONTRADO")
        {
          this.mostraNaoAcha();
        }
        else
        {
          this.lista_fornecedores = objeto_retorno;
          // DADOS DA PRIMEIRA ABA ( DADOS )
          this.nome = this.lista_fornecedores[0].nome;
          this.nreduz  = this.lista_fornecedores[0].nreduz;
          this.endereco = this.lista_fornecedores[0].endereco;
          this.complemento = this.lista_fornecedores[0].complemento;
          this.bairro = this.lista_fornecedores[0].bairro;
          this.estado = this.lista_fornecedores[0].estado;
          this.municipio = this.lista_fornecedores[0].municipio;
          this.cep = this.lista_fornecedores[0].cep;
          this.tipofor = this.lista_fornecedores[0].tipofor;
          this.cnpj = this.lista_fornecedores[0].cnpj;
          this.telefone = this.lista_fornecedores[0].telefone;
          this.ie = this.lista_fornecedores[0].ie;
          this.email = this.lista_fornecedores[0].email;
        }        


      }
      )
      this.fechaCarregando();  
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

  close() 
  {
    this.viewCtrl.dismiss();    
  } 
  
  mostraOk() 
  {
    const alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: this.lista_status[0].status,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();

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

  mostraNaoAcha() 
  {
    const alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Fornecedor Não Encontrado',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]     
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

  alteraForn()
  {

    let profileModal = this.modalCtrl.create(AltforPage , {
      
      codfor: this.codfor,
      loja: this.loja,
      nome : this.nome,
      nreduz  : this.nreduz,
      endereco : this.endereco,
      complemento : this.complemento,
      bairro : this.bairro,
      estado : this.estado,    
      municipio : this.municipio,
      cep : this.cep,
      tipofor : this.tipofor,
      cnpj : this.cnpj,
      telefone : this.telefone,
      ie : this.ie,
      email : this.email
      
    });
    profileModal.present();

  }

  excluiForn()
  {
    this.abreCarregando();

    var url = this.centralProvider.baseApiPath + "/detfornapl/"+this.codfor.toUpperCase() + "/" + this.loja.toUpperCase()

    this.data = this.centralProvider.http.delete(url , this.postData);  
    
    this.data.subscribe(data => {
      const objeto_retorno = JSON.parse(JSON.stringify(data)); 
      this.lista_status = objeto_retorno;
      
      if(this.lista_status[0].codigo=="01")
      {
        this.mostraOk();
        this.fechaCarregando();
        //this.navCtrl.push(BuscaprdPage);
      }
      else
      {
        this.fechaCarregando();
        this.mostraErro();
      }
      

    }, error => 
    {
      this.fechaCarregando();
      this.mostraConexao();
    });

  }  
  
  openMenu() 
  {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Opções',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.showConfirm();
          }
        },
        {
          text: 'Alterar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.pop();
            this.alteraForn();

          }
        }
      ]
    });
    actionSheet.present();
  }  

  showConfirm() 
  {
    const confirm = this.alertCtrl.create({
      title: 'Cuidado',
      message: 'Deseja realmente excluir esse Fornecedor?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
            
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.excluiForn();
          }
        }
      ]
    });
    confirm.present();
  }    

}
