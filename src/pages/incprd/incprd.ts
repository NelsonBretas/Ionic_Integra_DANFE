import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , AlertController , LoadingController } from 'ionic-angular';
import { RequestOptions , Headers } from '@angular/http';
import { CentralProvider } from '../../providers/central/central';
import { IfObservable } from 'rxjs/observable/IfObservable';

/**
 * Generated class for the IncprdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incprd',
  templateUrl: 'incprd.html',
})
export class IncprdPage 
{

  public lista_status = new Array<any>();

  private loader;

  private codprod:string='';
  private descricao:string='';
  private tipo:string='';
  private unidade:string='';
  private armazem:string='';
  private ncm:string='';
  private origem='';

  private testRadioOpen: boolean;
  private tudook:boolean=true;
  private msg:string='';

  

  private options:any;
  private headers:any;
  private data:any; 

  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController ,  public alertCtrl: AlertController  , private centralProvider:CentralProvider , public loadingCtrl:LoadingController ) 
  {

  }

  ionViewDidLoad() 
  {
    
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


  incProd()
  {
    var url = this.centralProvider.baseApiPath + "/detprodapl/"//http://localhost:8050/REST/DETPRODAPL";
    this.headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      this.options = new RequestOptions({ headers: this.headers });
      
      this.data = JSON.stringify({
        codprod: this.codprod.toUpperCase(),
        descricao: this.descricao.toUpperCase(),
        tipo: this.tipo.toUpperCase(),
        unidade: this.unidade.toUpperCase(),
        armazem: this.armazem.toLocaleUpperCase(),
        ncm: this.ncm,
        origem: this.origem
      });
    //let postData  = new FormData();;
    //postData.append('email','nelson.bretasjr@gmail.com');
    
    this.tudook = true;

    if(this.origem.length>1)
    {
      this.tudook = false;
      this.msg = "Preencha a Origem apenas com 1 digito!";
    } 

    if(this.armazem=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Armazém do Produto";
    }
    
    if(this.unidade=="")
    {
      this.tudook = false;
      this.msg = "Preencha a Unidade de Medida do Produto";
    }     

    if(this.tipo=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Tipo do Produto";
    }    
    
    if(this.descricao=="")
    {
      this.tudook = false;
      this.msg = "Preencha a Descrição do Produto";
    }      

    if(this.codprod=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Código de Produto";
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
