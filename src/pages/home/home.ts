import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ApiProvider} from '../../providers/api/api'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  numCliente : any;
  numPedido  : any;
  barCodeBoleto = "";
  isPedido = false;
  isPagar = false;
  constructor(public api: ApiProvider, public navCtrl: NavController) {}

  cliente(){
    this.barCodeBoleto = "";
    let data = {  
      "ownId":"1", 
      "fullname":"Maria Oliveira",
      "email":"maria@email.com",
      "birthDate":"1980-5-10",
      "taxDocument":{  
         "type":"CPF",
         "number":"10013390023"
      },
      "phone":{  
         "countryCode":"55",
         "areaCode":"11",
         "number":"22226842"
      },
      "shippingAddress":{  
         "city":"Rio de Janeiro",
         "district":"Ipanema",
         "street":"Avenida Atlântica",
         "streetNumber":"60",
         "zipCode":"02446000",
         "state":"RJ",
         "country":"BRA"
      },
      "fundingInstrument":{  
         "method":"CREDIT_CARD",
         "creditCard":{  
            "expirationMonth":"06",
            "expirationYear":"22",
            "number":"6362970000457013",
            "cvc":"123",
            "holder":{  
               "fullname":"Maria Oliveira",
               "birthdate":"1980-05-10",
               "taxDocument":{  
                  "type":"CPF",
                  "number":"10013390023"
               },
               "billingAddress":{  
                  "city":"Rio de Janeiro",
                  "district":"Copacabana",
                  "street":"Rua Raimundo Corrêa",
                  "streetNumber":"1200",
                  "zipCode":"05246200",
                  "state":"RJ",
                  "country":"BRA"
               },
               "phone":{  
                  "countryCode":"55",
                  "areaCode":"11",
                  "number":"22226842"
               }
            }
         }
      }
   }
    this.api.createCliente(data).then((ret) => {
      console.log(ret)
      var res = Object.keys(ret)
        .map(function(k) {
          console.log(k, ret[k]);

          return [k, ret[k]];

        });
        console.log(res[0][1]);
        this.numCliente = res[0][1]
        this.isPedido = true;
    });
  }

  pedido(){
    let data = {  
      "ownId":"1",
      "amount":{  
         "currency":"BRL",
         "subtotals":{  
            "shipping":1500
         }
      },
      "items":[  
         {  
            "product":"Descrição do pedido",
            "category":"CLOTHING",
            "quantity":1,
            "detail":"Camiseta estampada branca",
            "price":9500
         }
      ],
      "customer":{  
         "id": this.numCliente
      }
   }
   this.api.createPedido(data).then((ret) => {
    console.log(ret)
    var res = Object.keys(ret)
      .map(function(k) {
        console.log(k, ret[k]);

        return [k, ret[k]];

      });
      console.log(res[0][1]);
      this.numPedido = res[0][1]
      this.isPagar = true;

  });   
  }

  pagar(){
    let data = {  
      "statementDescriptor":"Minha Loja",
      "fundingInstrument":{  
         "method":"BOLETO",
         "boleto":{  
            "expirationDate":"2020-06-20",
            "instructionLines":{  
               "first":"Atenção,",
               "second":"fique atento à data de vencimento do boleto.",
               "third":"Pague em qualquer casa lotérica."
            },
            "logoUri":"http://www.lojaexemplo.com.br/logo.jpg"
         }
      }
   }
   this.api.createPagamento(this.numPedido, data).then((ret) => {
    console.log(ret)
    var res = Object.keys(ret)
      .map(function(k) {
        console.log(k, ret[k]);

        return [k, ret[k]];

      });

      this.barCodeBoleto = res[6][1].boleto.lineCode;
      this.isPedido = false;
      this.isPagar = false;

  });   
  }
   
}
