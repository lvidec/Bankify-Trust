import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayoutRoutingModule } from './payout-routing.module';
import {PayoutComponent} from "../payout.component";
import {PaymentModule} from "../../payment/moduli/payment.module";


@NgModule({
  declarations: [PayoutComponent],
  imports: [
    CommonModule,
    PayoutRoutingModule,
    PaymentModule
  ]
})
export class PayoutModule { }
