import { Pipe, PipeTransform } from '@angular/core';
import {Payment} from "../modeli/payment.model";
import {User} from "../modeli/user.model";
import {Router} from "@angular/router";

@Pipe({
  name: 'filterPaymentsByUser'
})
export class FilterPaymentsByUserPipe implements PipeTransform {

  constructor(private router: Router) {
  }

  transform(array: Payment[], user: User): any[] {
    if(!Array.isArray(array))
      return;


    if(this.router.url.includes('/payment'))
      return array.filter(x => x.userFrom.username == user.username);
    else if (this.router.url.includes('/payout'))
      return array.filter(x => x.userTo.username == user.username);
  }

}
