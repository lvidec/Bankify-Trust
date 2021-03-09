import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataPaymentsService} from "../data-payments.service";
import {Payment} from "../modeli/payment.model";
import {Subscription} from "rxjs";
import {User} from "../modeli/user.model";
import {AuthService} from "../shared/auth.service";
import {DataUsersService} from "../data-users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  payments: Payment[] = [];
  payouts: Payment[] = [];
  subscription: Subscription;
  user: User;

  editedPayment: Payment;
  users: User[] = [];
  newPayment = new Payment();
  // newPayment: Payment = {
  //   _id: '',
  //   date: new Date(),
  //   userIdTo: '',
  //   userIdFrom: '',
  //   amount: 1
  // };
  newUsername: string;
  newAmount: number;
  windowState: string;
  state: string;

  constructor(private paymentsService: DataPaymentsService, private auth: AuthService,
              private usersService: DataUsersService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.subscription = this.paymentsService.getPayments().subscribe((res: any) => {
      this.payments = res;
    })
  }

  getRoute(routeSubString){
    return this.router.url.includes(routeSubString);
  }

  onEdit(payment) {
    this.windowState = 'active';
    this.state = 'edit';
    this.editedPayment = {...payment};
    this.editedPayment.userIdTo = payment.userTo._id;
    this.editedPayment.userIdFrom = payment.userFrom._id;
  }

  onAdd() {
    this.windowState = 'active';
    this.state = 'add';
    this.usersService.getUsers().subscribe((res: any) =>{
      this.users = res;
    })
  }

  onCancel() {
    this.windowState = '';
    this.state = '';
    // this.newPayment = null;
  }

  editPayment() {
    // delete pay.userTo;
    // delete pay.userFrom;

    this.paymentsService.updatePayment(this.editedPayment);

  }

  deletePayment(id) {
    console.log(id);
    this.paymentsService.deletePayment(id);
    this.payments = this.payments.filter(x => x._id != id)
  }

  addPayment() {
    // this.newPayment.userIdFrom = this.user._id;
    // this.newPayment.username = this.newUsername;
    this.newPayment.amount = this.newAmount;
    this.newPayment.userIdFrom = this.user._id;

    let userTo = this.users.find(x => x.username == this.newUsername);
    this.newPayment.userIdTo = userTo._id;

    this.paymentsService.addPayment({...this.newPayment});

    this.newPayment.userTo = userTo;

    delete this.newPayment.userIdFrom;
    delete this.newPayment.userIdTo;

    //1 let temp = {...this.payments[2]};
    // console.log(temp);
    // this.payments.push(temp);
    // console.log(this.payments);

    this.newPayment.date = new Date();
    this.newPayment.userFrom = this.user;

    // console.log("test", this.newPayment);
    this.payments.push(this.newPayment);

    // this.payments = this.payments.slice();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
