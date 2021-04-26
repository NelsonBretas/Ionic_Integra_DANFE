import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController , AlertController , LoadingController } from 'ionic-angular';
import { RequestOptions , Headers } from '@angular/http';
import { CentralProvider } from '../../providers/central/central';
import { empty } from 'rxjs/Observer';


/**
 * Generated class for the IncforPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incfor',
  templateUrl: 'incfor.html',
})
export class IncforPage 
{

  public lista_status = new Array<any>();
  private loader;
  private testRadioOpen: boolean;
  private tudook:boolean=true;
  private msg:string='';
  
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

  private options:any;
  private headers:any;
  private data:any;   



  constructor(public navCtrl: NavController, public navParams: NavParams , public viewCtrl: ViewController ,  public alertCtrl: AlertController  , private centralProvider:CentralProvider , public loadingCtrl:LoadingController) 
  {

  }

  buscaDados()
  {
    if(this.cnpj.length==14)
    {
      this.abreCarregando();
      this.centralProvider.getCnpj(this.cnpj).subscribe(
        data=>
        {
          const response = (data as any);
          const objeto_retorno = JSON.parse(JSON.stringify(response)); 
          console.log(objeto_retorno);

          this.nome = '';
          this.nreduz = '';
          this.endereco = '';
          this.complemento = '';
          this.bairro = '';
          this.estado = '';
          this.municipio = '';
          this.cep = '';
          this.telefone = '';
          this.email = '';          
          this.tipofor = '';          
  

          this.nome = objeto_retorno.nome;
          this.nreduz = objeto_retorno.fantasia;
          this.endereco = objeto_retorno.logradouro +', '+  objeto_retorno.numero;
          this.complemento = objeto_retorno.complemento;
          this.bairro = objeto_retorno.bairro;
          this.estado = objeto_retorno.uf;
          this.municipio = objeto_retorno.municipio;
          this.cep = objeto_retorno.cep;
          this.telefone = objeto_retorno.telefone;
          this.email = objeto_retorno.email;
          this.tipofor = 'J';
  
        }
      )
      this.fechaCarregando(); 
    }
   
  }

  showEstado() 
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Estados Brasileiros');

    alert.addInput(
    {
      type: 'radio',
      label: 'Acre',
      value: 'AC',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Alagoas',
      value: 'AL',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Amapá',
      value: 'Amazonas',
      checked: false
    });      

    alert.addInput(
    {
      type: 'radio',
      label: 'Bahia',
      value: 'BA',
      checked: false
    });          

    alert.addInput(
    {
      type: 'radio',
      label: 'Ceará',
      value: 'CE',
      checked: false
    });         
      
    alert.addInput(
    {
      type: 'radio',
      label: 'Distrito Federal',
      value: 'DF',
      checked: false
    });         
        
    alert.addInput(
    {
      type: 'radio',
      label: 'Espírito Santo',
      value: 'ES',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Goiás',
      value: 'GO',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Maranhão',
      value: 'MA',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Mato Grosso',
      value: 'MT',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Mato Grosso do Sul',
      value: 'MS',
      checked: false
    });             

    alert.addInput(
    {
      type: 'radio',
      label: 'Minas Gerais',
      value: 'MG',
      checked: false
    });    
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Pará',
      value: 'PA',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Paraíba',
      value: 'PB',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Paraná',
      value: 'PR',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Pernambuco',
      value: 'PE',
      checked: false
    });     

    alert.addInput(
    {
      type: 'radio',
      label: 'Piauí',
      value: 'PI',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Rio de Janeiro',
      value: 'RJ',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Rio Grande do Norte',
      value: 'RN',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Rio Grande do Sul',
      value: 'RS',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Rondônia',
      value: 'RO',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Roraima',
      value: 'RR',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'Santa Catarina',
      value: 'SC',
      checked: false
    });         
    
    alert.addInput(
    {
      type: 'radio',
      label: 'São Paulo',
      value: 'SP',
      checked: false
    });             

    alert.addInput(
    {
      type: 'radio',
      label: 'Sergipe',
      value: 'SE',
      checked: false
    });         

    alert.addInput(
    {
      type: 'radio',
      label: 'Tocantins',
      value: 'TO',
      checked: false
    });             

    alert.addInput(
    {
      type: 'radio',
      label: 'Estrangeiro',
      value: 'EX',
      checked: false
    });                 

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.estado = data;
        
      }
    });
    alert.present();
    
  }

  showTipo() 
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Tipos de Fornecedores');

    alert.addInput(
    {
      type: 'radio',
      label: 'Jurídico',
      value: 'J',
      checked: false
    });

    alert.addInput(
    {
      type: 'radio',
      label: 'Físico',
      value: 'F',
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

  incFor()
  {
    var url = this.centralProvider.baseApiPath + "/detfornapl/"//http://localhost:8050/REST/DETPRODAPL";
    this.headers = new Headers(
      {
        'Content-Type' : 'application/json'
      });
      this.options = new RequestOptions({ headers: this.headers });
      
      this.data = JSON.stringify({
        cnpj: this.cnpj,
        nome: this.nome.toUpperCase(),
        nreduz: this.nreduz.toUpperCase(),
        endereco: this.endereco.toUpperCase(),
        complemento: this.complemento.toUpperCase(),
        bairro: this.bairro.toUpperCase(),
        estado: this.estado.toUpperCase(),
        municipio: this.municipio.toUpperCase(),
        cep: this.cep.toUpperCase(),
        tipo: this.tipofor.toUpperCase(),
        telefone: this.telefone.toUpperCase(),
        inscricao: this.ie.toUpperCase(),
        email: this.email
      });
    //let postData  = new FormData();;
    //postData.append('email','nelson.bretasjr@gmail.com');
    
    this.tudook = true;

    if(this.tipofor=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Tipo do Fornecedor!";
    } 

    if(this.municipio=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Municipio do Fornecedor";
    }
    
    if(this.estado=="")
    {
      this.tudook = false;
      this.msg = "Preencha o estado do Fornecedor";
    }     

    if(this.bairro=="")
    {
      this.tudook = false;
      this.msg = "Preencha o Bairro do Fornecedor";
    }    
    
    if(this.endereco=="")
    {
      this.tudook = false;
      this.msg = "Preencha o endereço do Fornecedor";
    }      

    if(this.nreduz=="")
    {
      this.tudook = false;
      this.msg = "Preencha o nome Fantasia do Fornecedor";
    }    

    if(this.nome=="")
    {
      this.tudook = false;
      this.msg = "Preencha a Razão Social do Fornecedor";
    }            

    if(this.cnpj=="")
    {
      this.tudook = false;
      this.msg = "Preencha o CNPJ/CPF do Fornecedor";
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
