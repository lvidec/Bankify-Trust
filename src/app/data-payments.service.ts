import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Payment} from "./modeli/payment.model";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataPaymentsService {

  // apiRoot = 'http://localhost:8081/api/payments';
  apiRoot = environment.API_URL + '/api/payments';
  // deleteApiRoot = 'http://localhost:8081/api/deletePayments';
  deleteApiRoot = environment.API_URL + '/api/deletePayments';
  payments: Payment[] = [];
  paymentsSubject: BehaviorSubject<Payment[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.onInit();
  }

  onInit(){
    this.http.get(this.apiRoot).subscribe((res: any) => {
      this.payments = res.payments;
      console.log(this.payments);
      this.paymentsSubject.next([...this.payments]);
    })
  }

  getPayments(){
    return this.paymentsSubject;
  }

  addPayment(payment){
    this.http.post(this.apiRoot, payment).subscribe((res: any) =>{
      this.payments.push(res.payment);
      this.paymentsSubject.next([...this.payments]);
    })
  }

  deletePayment(id){
    this.http.delete(this.apiRoot + `/${id}`).subscribe(res =>{
      this.payments = this.payments.filter(x => x._id != id);
      this.paymentsSubject.next([...this.payments]);
    })
  }

  updatePayment(newPayment: Payment){
    this.http.put(this.apiRoot + `/${newPayment._id}`, newPayment).subscribe(res =>{
      let idx = this.payments.findIndex(x => x._id == newPayment._id)
      this.payments[idx] = newPayment;
      this.paymentsSubject.next([...this.payments]);
    })
  }

  deletePaymentsByUser(userId){
    this.http.delete(this.deleteApiRoot + `/${userId}`).subscribe(res =>{
      debugger;
      this.payments = this.payments.filter(
        x => (x.userFrom._id != userId) || (x.userTo._id != userId)
      );
      console.log(this.payments);
      this.paymentsSubject.next([...this.payments]);
    })
  }

}
