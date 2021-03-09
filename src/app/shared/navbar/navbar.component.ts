import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../../modeli/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  user: User;

  ngOnInit(): void {
    this.user = this.auth.getUser();
    console.log(this.user);
  }

  getClass(path) {
    return this.router.url == path ? 'active' : '';
  }

  onLogout() {
    this.auth.logout();
  }

  userExists(){
    return this.auth.getUser() != null && this.auth.getUser() != undefined;
  }
}
