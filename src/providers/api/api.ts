import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiProvider {
  public apiCliente = "https://sandbox.moip.com.br/v2/customers/";
  public apiPedido = "https://sandbox.moip.com.br/v2/orders";
  public apiPayment = "https://sandbox.moip.com.br/v2/orders/"
  
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  createCliente(data){
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Authorization', 'Basic YOUR_HASH_base64_KEY');
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({headers:headers});
      this.http.post(this.apiCliente, data, requestOptions).subscribe(res =>{
        resolve(res.json());
      }), (err) =>{
        reject(err);
      }
    })
  }  

  createPedido(data){
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Authorization', 'Basic YOUR_HASH_base64_KEY');
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({headers:headers});
      this.http.post(this.apiPedido, data, requestOptions).subscribe(res =>{
        resolve(res.json());
      }), (err) =>{
        reject(err);
      }
    })
  }

  createPagamento(order, data){
    this.apiPayment = this.apiPayment + order + '/payments'
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Authorization', 'Basic YOUR_HASH_base64_KEY');
      headers.append('Content-Type', 'application/json');
      const requestOptions = new RequestOptions({headers:headers});
      this.http.post(this.apiPayment, data, requestOptions).subscribe(res =>{
        resolve(res.json());
      }), (err) =>{
        reject(err);
      }
    })    
  }

}
