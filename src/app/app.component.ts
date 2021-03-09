import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bank';

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      console.log('sus');
      this.router.navigate(['login'])
    }
  }
}
