import { HttpClient , HttpClientModule  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions , Headers } from '@angular/http';



/*
  Generated class for the CentralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CentralProvider {

  //private baseApiPath  = "https://api.themoviedb.org/3";
  public baseApiPath  = "/restAdvpl";
  public baseCnpj     = "/receitaWs";
  constructor(
    public http: HttpClient
    ) {

    
  }

  getCodVig()
  {
    return "000003";
  }

  getProduto(_tipo , _ponteiro)
  {
    return this.http.get(this.baseApiPath +  "/GETPRODAPL?tipo=" + _tipo + "&ponteiro="+ _ponteiro );    
  }

  getFornecedor(_tipo , _ponteiro)
  {
    return this.http.get(this.baseApiPath +  "/GETFORNAPL?tipo=" + _tipo + "&ponteiro="+ _ponteiro );    
  }    

  getProdDet(_codigo)
  {
    return this.http.get(this.baseApiPath +  "/DETPRODAPL?codigo=" + _codigo);    
  }  

  getCompl(_tipo , _ponteiro)
  {
    return this.http.get(this.baseApiPath +  "/GETCOMPLAPL?tipo=" + _tipo + "&ponteiro="+ _ponteiro );    
  }

  getComplDet(_recno)
  {
    return this.http.get(this.baseApiPath +  "/DETCOMPLAPL?crecno=" + _recno);    
  }  

  getFornDet(_codfor , _loja)
  {
    return this.http.get(this.baseApiPath +  "/DETFORNAPL?codfor=" + _codfor + "&loja=" + _loja);    
  }   

  getCnpj(_cnpj)
  {
    return this.http.get( this.baseCnpj + "/v1/cnpj/" + _cnpj );    
  }
  
  getVigilante(nome , endereco , status)
  {
    
    if(nome == "" && endereco == "")
    {
      if(status=="")
      {
        return this.http.get(this.baseApiPath +  "/vigilante.php/get?key=1&vig=" + this.getCodVig());
      }
      else
      {
        return this.http.get(this.baseApiPath +  "/vigilante.php/get?key=1&vig=" + this.getCodVig() + "&status=" + status);
      }
      
    }
    else if(nome == "" && endereco != "")
    {
      return this.http.get(this.baseApiPath +  "/vigilante.php/get?key=1&vig=" + this.getCodVig() + "&end=" + endereco );
    }
    else if(nome != "" && endereco == "" )
    {      
      return this.http.get(this.baseApiPath +  "/vigilante.php/get?key=1&vig=" + this.getCodVig() + "&mor=" + nome );
    }
    else
    {      
      return this.http.get(this.baseApiPath +  "/vigilante.php/get?key=1&vig=" + this.getCodVig() + "&mor=" + nome + "&end=" + endereco );
    }
    
  }

  getMsg()
  {
    return this.http.get(this.baseApiPath +  "/generico.php/get?key=1&msg=" + this.getCodVig());
  }


  //http://aplaut-nelsonbretasjr452116.codeanyapp.com/olhar/api/vigilante.php?key=1&vig=000003&SA=1

  getDetalhes()
  {
    return this.http.get(this.baseApiPath +  "/generico.php/get?key=1&detalhes=" + this.getCodVig());
  } 
  
  getApi()
  {
    return this.baseApiPath;
  }


}
