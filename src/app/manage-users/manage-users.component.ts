import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {DataUsersService} from "../data-users.service";
import {User} from "../modeli/user.model";
import {DataPaymentsService} from "../data-payments.service";
import {Payment} from "../modeli/payment.model";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: User[] = [];
  user: User;

  constructor(private auth: AuthService, private usersService: DataUsersService, private paymentService: DataPaymentsService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((res:any) =>{
      this.users = res;
      this.user = this.auth.getUser();
    })
  }

  deleteUser(user: User) {
    debugger;
    this.usersService.deleteUser(user);
    this.users = this.users.filter(x => x._id != user._id);
    this.paymentService.deletePaymentsByUser(user._id);
  }
}
