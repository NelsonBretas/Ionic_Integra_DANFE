import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , AlertController  , Platform , LoadingController , ActionSheetController , ModalController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { AltcomplPage } from '../altcompl/altcompl';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


/**
 * Generated class for the DetcomplPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detcompl',
  templateUrl: 'detcompl.html',
})
export class DetcomplPage 
{

  private loader;


  public lista_produtos = new Array<any>();
  public lista_status = new Array<any>();
  private postData;
  private data:any;
  private tudook:boolean=false;
  private isReadonly:boolean=false;  

  private recno:string='';
  private nome:string='';
  private codprod:string='';
  private descricao:string='';  
  private prodfor1:string='';
  private prodfor2:string='';


  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController , private centralProvider:CentralProvider , public loadingCtrl:LoadingController , public actionsheetCtrl: ActionSheetController , public platform: Platform , public alertCtrl: AlertController , public modalCtrl: ModalController) 
  {
    this.recno      = navParams.get("recno");
  }

  ionViewDidLoad() 
  {
    this.abreCarregando();
    this.centralProvider.getComplDet(this.recno).subscribe(
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
          this.lista_produtos = objeto_retorno;
          // DADOS DA PRIMEIRA ABA ( DADOS )
          this.codprod    = this.lista_produtos[0].codigo;
          this.descricao  = this.lista_produtos[0].descricao;
          this.prodfor1   = this.lista_produtos[0].prodfor1;
          
          
       

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
      subTitle: 'Produto Não Encontrado',
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
            this.alteraCompl();

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
      message: 'Deseja realmente excluir essa Amarração?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
            
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.excluiCompl();
          }
        }
      ]
    });
    confirm.present();
  }
  
  alteraCompl()
  {

    let profileModal = this.modalCtrl.create(AltcomplPage , {
      
      codprod: this.codprod,
      prodfor: this.prodfor1,
      descricao: this.descricao,
      recno: this.recno

      
    });
    profileModal.present();

  }

  excluiCompl()
  {
    this.abreCarregando();

    var url = this.centralProvider.baseApiPath + "/detcomplapl/"+this.recno

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

}
