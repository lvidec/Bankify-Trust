import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from "../modeli/payment.model";
import {Subscription} from "rxjs";
import {DataPaymentsService} from "../data-payments.service";
import {AuthService} from "../shared/auth.service";
import {User} from "../modeli/user.model";

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit, OnDestroy {

  payments: Payment[] = [];
  filteredPayment: Payment[] = []
  filteredPayout: Payment[] = [];
  subscription: Subscription;
  user: User;

  constructor(private paymentsService: DataPaymentsService, private auth: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.paymentsService.getPayments().subscribe((res: any) => {
      this.user = this.auth.getUser();
      if(res != null) {
        this.payments = res;
        this.filteredPayment = this.payments.filter(x => x.userFrom._id == this.user._id);
        this.filteredPayout = this.payments.filter(x => x.userTo._id == this.user._id);
        if(this.filteredPayment.length > 5)
          this.filteredPayment.length = 5;
        if(this.filteredPayout.length > 5)
          this.filteredPayout.length = 5;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
