import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountBalanceRoutingModule } from './account-balance-routing.module';
import {AccountBalanceComponent} from "../account-balance.component";


@NgModule({
  declarations: [AccountBalanceComponent],
  imports: [
    CommonModule,
    AccountBalanceRoutingModule
  ]
})
export class AccountBalanceModule { }
