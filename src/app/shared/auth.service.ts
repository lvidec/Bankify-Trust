import {Injectable, Injector, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {User} from "../modeli/user.model";
import {DataUsersService} from "../data-users.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  user : any;
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();

  users: any[] = null;
  usersSubject: BehaviorSubject<User[]> = null;
  subscription: Subscription;

  authUrl: string = environment.API_URL + '/authenticate';
  // authUrl: string = 'http://localhost:8081/authenticate';
  token: string;


  constructor(private http: HttpClient, private router: Router, private injector: Injector) { }

  login(credentials : {username : string, password: string}){

    let usersService = this.injector.get(DataUsersService);

    this.subscription = usersService.getUsers().subscribe(res => {
      this.users = res;
    });

    this.http.post(this.authUrl, credentials)
      // .subscribe(async (res : {status : string, description? : string, user? : User, token? : string }) => {
      .subscribe((res : {status : string, description? : string, user? : User, token? : string }) => {
        if (res.status == "OK") {
          this.user = res.user;
          this.token = res.token;
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authChange.next(true);
          this.router.navigate(['/accountBalance']);
        }
        else {
          this.errorEmitter.next(res.description);
        }
      });

  }

  logout(){
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(){
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    return this.user;
  }

  getToken(){
    if (this.token)
      return this.token;
    else {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        return this.token;
      }
    }
    return null;
  }

  isAuthenticated(){
    return this.getUser();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  // whoAmI() {
  //   if (this.isAuthenticated()) {
  //     return this.user
  //   } else {
  //     return new Observable(observer => {
  //       observer.next({status:100})
  //     })
  //   }
  //
  // }


}
