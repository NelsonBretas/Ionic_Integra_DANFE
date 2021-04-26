import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController , AlertController } from 'ionic-angular';
import { CentralProvider } from '../../providers/central/central';
import { RequestOptions , Headers } from '@angular/http';

/**
 * Generated class for the AltprdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-altprd',
  templateUrl: 'altprd.html',
})
export class AltprdPage 
{


  private options:any;
  private headers:any;
  private data:any; 

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

  private loader;
  private testRadioOpen;

  public lista_status = new Array<any>();



  constructor(public navCtrl: NavController, public navParams: NavParams , private centralProvider:CentralProvider , public loadingCtrl:LoadingController , public alertCtrl: AlertController ) 
  {
    this.codprod  = navParams.get("codprod");
    this.descprod = navParams.get("descricao");
    this.armazem  = navParams.get("armazem");
    this.ncm      = navParams.get("ncm");
    this.tipo     = navParams.get("tipo");
    this.unidade  = navParams.get("unidade");
    this.conta    = navParams.get("conta");
    this.cc       = navParams.get("cc");
    this.origem   = navParams.get("origem");
    this.grupo    = navParams.get("grupo");

    this.ncm      = this.ncm.substring(0, 8);
    this.conta    = this.conta.substring(0,9);
    this.cc       = this.cc.substring(0,3);

  }

  ionViewDidLoad() 
  {
    
  }

  altProd()
  {

    this.abreCarregando();
    var url = this.centralProvider.baseApiPath + "/detprodapl/"//http://localhost:8050/REST/DETPRODAPL";

    this.headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      this.options = new RequestOptions({ headers: this.headers });
      
      this.data = JSON.stringify({
        codprod: this.codprod.toUpperCase(),
        descricao: this.descprod.toUpperCase(),
        armazem: this.armazem.toUpperCase(),
        tipo: this.tipo.toUpperCase(),
        unidade: this.unidade.toUpperCase(),
        ncm: this.ncm,
        origem: this.origem
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

  showTipo() 
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Tipo de Produto');

    alert.addInput(
    {
      type: 'radio',
      label: 'Ativo Imobilizado',
      value: 'AI',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Beneficiamento',
      value: 'BN',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Embalagem',
      value: 'EM',
      checked: false
    });      

    alert.addInput(
    {
      type: 'radio',
      label: 'Garantia Estendida',
      value: 'GE',
      checked: false
    });          

    alert.addInput(
    {
      type: 'radio',
      label: 'Gastos Gerais',
      value: 'GG',
      checked: false
    });         
      
    alert.addInput(
    {
      type: 'radio',
      label: 'Generico',
      value: 'GN',
      checked: false
    });         
        
    alert.addInput(
    {
      type: 'radio',
      label: 'Insumo Agrícola',
      value: 'IA',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Insumo Industrial',
      value: 'II',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Produtos Industriais',
      value: 'IN',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Kit',
      value: 'KT',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Material de Consumo',
      value: 'MC',
      checked: false
    });             

    alert.addInput(
    {
      type: 'radio',
      label: 'Mercadoria',
      value: 'ME',
      checked: false
    });    
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Materiais Manfro',
      value: 'MM',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Mão de Obra',
      value: 'MO',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Matéria Prima',
      value: 'MP',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Outros Insumos',
      value: 'OI',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Produto Acabado',
      value: 'PA',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Produto Intermediario',
      value: 'PI',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Produto em Processo',
      value: 'PP',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Produto Veiculo',
      value: 'PV',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Selo de Controle',
      value: 'SL',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Sementes',
      value: 'SM',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'SubProduto',
      value: 'SP',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Serviço',
      value: 'SV',
      checked: false
    });             

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.tipo = data;
        
      }
    });
    alert.present();
    
  }

  showUnidade() 
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Unidade de Medida');

    alert.addInput(
    {
      type: 'radio',
      label: 'Arroba',
      value: 'AR',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Balde',
      value: 'BD',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Centímetro Cubico',
      value: 'CC',
      checked: false
    });      

    alert.addInput(
    {
      type: 'radio',
      label: 'Centímetro',
      value: 'CM',
      checked: false
    });          

    alert.addInput(
    {
      type: 'radio',
      label: 'Cento',
      value: 'CT',
      checked: false
    });         
      
    alert.addInput(
    {
      type: 'radio',
      label: 'Caixa',
      value: 'CX',
      checked: false
    });         
        
    alert.addInput(
    {
      type: 'radio',
      label: 'Decimetro',
      value: 'Dm',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Duzia',
      value: 'DZ',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Folhas',
      value: 'FL',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Pes',
      value: 'FT',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Grama',
      value: 'G',
      checked: false
    });             

    alert.addInput(
    {
      type: 'radio',
      label: 'Galão',
      value: 'GL',
      checked: false
    });    
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Groza',
      value: 'GZ',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Hora',
      value: 'HO',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Jogo',
      value: 'JG',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Quilograma',
      value: 'KG',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Kit',
      value: 'KT',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Litro',
      value: 'L',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Libra',
      value: 'LB',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Lata',
      value: 'LT',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Metro Quadrado',
      value: 'M2',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Metro Cúbico',
      value: 'M3',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Mililitro',
      value: 'ML',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Milimetro',
      value: 'MM',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Metro',
      value: 'MT',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Onça',
      value: 'OZ',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Par',
      value: 'P',
      checked: false
    });        
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Peca',
      value: 'PC',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Polegadas',
      value: 'PL',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Tonelada',
      value: 'TL',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Unidade',
      value: 'UN',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Jarda',
      value: 'YD',
      checked: false
    });             

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.unidade = data;
        
      }
    });
    alert.present();
    
  }  
    


}
