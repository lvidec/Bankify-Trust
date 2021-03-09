import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import {PaymentComponent} from "../payment.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {FilterPaymentsByUserPipe} from "../../shared/filter-payments-by-user.pipe";


@NgModule({
  declarations: [PaymentComponent, FilterPaymentsByUserPipe],
  exports: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class PaymentModule { }
