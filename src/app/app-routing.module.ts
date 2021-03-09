import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BankModule} from "./bank/moduli/bank.module";
import {LoginModule} from "./login/moduli/login.module";
import {RegisterModule} from "./register/moduli/register.module";
import {PaymentModule} from "./payment/moduli/payment.module";
import {PayoutModule} from "./payout/moduli/payout.module";
import {AccountBalanceModule} from "./account-balance/moduli/account-balance.module";
import {AuthGuardService} from "./shared/auth-guard.service";
import {ManageUsersModule} from "./manage-users/moduli/manage-users.module";
import {RoleGuard} from "./shared/role.guard";

const routes: Routes = [
  {path: '', loadChildren: () => BankModule},
  {path: 'login', loadChildren: () => LoginModule},
  {path: 'register', loadChildren: () => RegisterModule},
  {path: 'payment', loadChildren: () => PaymentModule, canActivate: [AuthGuardService]},
  {path: 'payout', loadChildren: () => PayoutModule, canActivate: [AuthGuardService]},
  {path: 'accountBalance', loadChildren: () => AccountBalanceModule, canActivate: [AuthGuardService]},
  {path: 'manageUsers', loadChildren: () => ManageUsersModule, canActivate: [RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
