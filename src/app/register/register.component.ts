import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../modeli/user.model";
import {DataUsersService} from "../data-users.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  user: User = new User();
  users: User[] = [];
  subscription: Subscription;
  disabled: boolean;
  // user: User;

  constructor(private userService: DataUsersService) { }

  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe((res:any) =>{
      this.users = res;
      console.log(this.users);
    })
  }

  usernameExists(username) {
    if (username != null && username != '' && username != undefined && this.users != null && this.users != undefined) {
      if (this.users.some(x => x.username == username)) {
        this.disabled = true;
        return true;
      }
    }
    else {
      this.disabled = false;
      return false;
    }
  }

  send(form: NgForm) {

    this.userService.addUser(this.user);
    this.user.repeatedPassword = '';
    this.user.password = '';
    this.user.username = '';
    this.user.email = '';

    form.resetForm();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
