import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , AlertController  , Platform , LoadingController , ActionSheetController , ModalController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { AltprdPage } from '../altprd/altprd';
import { BuscaprdPage } from '../buscaprd/buscaprd';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the DetprodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detprod',
  templateUrl: 'detprod.html',
})
export class DetprodPage 
{

  public lista_produtos = new Array<any>();
  public lista_status = new Array<any>();
  private postData;
  private tudook:boolean=false;
  private isReadonly:boolean=false;

  // VARIAVEL PARA ALTERAR A FORMA DE VISUALIZAÇÃO
  private modelo:any;
  private loader;
  private data:any;
  private headers:any;
  private options:any;

  

  // VARIAVEIS PARA TELA DADOS DO PRODUTO
  private codprod:string='';
  private descprod:string='';
  private armazem:string='';
  private ncm:string='';
  private tipo:string='';
  private unidade:string='';
  private conta:string='';
  private cc:string='';
  private origem:string='';
  private grupo:string='';
  
  // VARIAVEIS PARA A TELA DE SALDO DE ESTOQUE
  private qatu:string='0';
  private vatu:string='0'; 
  private unitario:string='0';
  private empenho:string='0';  
  private naoend:string='0';
  private pedidov:string='0';
  private qentrar:string='0';
  private meu3:string='0';
  private saldo3:string='0';
  private qsa:string='0';
  private qop:string='0';

  /* VARIAVEIS PARA A TELA DE ENTRADAS E SAÍDAS
  private notasD1:string='';
  private notasD2:string='';
  private notasD3:string='';  
  private pedidos:string='';
  private pv:string='';
  private solicitacoes:string='';
  private armazem:string='';
  private ordem:string='';
  */

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController , private centralProvider:CentralProvider , public loadingCtrl:LoadingController , public actionsheetCtrl: ActionSheetController , public platform: Platform , public alertCtrl: AlertController , public modalCtrl: ModalController ) 
  {

    this.codprod    = navParams.get("codprod");
        
  }

  ionViewDidLoad() 
  {
    this.abreCarregando();
    this.centralProvider.getProdDet(this.codprod.toUpperCase()).subscribe(
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
          this.descprod = this.lista_produtos[0].descricao;
          this.armazem  = this.lista_produtos[0].armazem;
          this.ncm = this.lista_produtos[0].ncm;
          this.tipo = this.lista_produtos[0].tipo;
          this.unidade = this.lista_produtos[0].unidade;
          this.conta = this.lista_produtos[0].conta;
          this.cc = this.lista_produtos[0].cc;
          this.origem = this.lista_produtos[0].origem;
          this.grupo = this.lista_produtos[0].grupo;

          // DADOS DA SEGUNDA ABA ( SALDOS )
          this.qatu = this.lista_produtos[0].qatu;
          this.vatu = this.lista_produtos[0].vatu;
          this.unitario = this.lista_produtos[0].unitario;
          this.empenho = this.lista_produtos[0].empenho;
          this.naoend = this.lista_produtos[0].naoend;
          this.pedidov = this.lista_produtos[0].pedidov;
          this.qentrar = this.lista_produtos[0].qentrar;
          this.meu3 = this.lista_produtos[0].meu3;
          this.saldo3 = this.lista_produtos[0].saldo3;
          this.qsa = this.lista_produtos[0].qsa;
          this.qop = this.lista_produtos[0].qop;          

        }        


      }
    )
    this.fechaCarregando();    


  }

  alteraProd()
  {

    let profileModal = this.modalCtrl.create(AltprdPage , {
      
      codprod: this.codprod,
      descricao: this.descprod,
      armazem:   this.armazem,
      ncm:       this.ncm,
      tipo:      this.tipo,
      unidade:   this.unidade,
      conta:     this.conta,
      cc:        this.cc,
      origem:    this.origem,
      grupo:     this.grupo
      
    });
    profileModal.present();

  }

  excluiProd()
  {
    this.abreCarregando();

    var url = this.centralProvider.baseApiPath + "/detprodapl/"+this.codprod.toUpperCase()

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
            this.alteraProd();

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
      message: 'Deseja realmente excluir esse Produto?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
            
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.excluiProd();
          }
        }
      ]
    });
    confirm.present();
  }  

}
