import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./modeli/user.model";
import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataUsersService {

  // apiRoot = 'http://localhost:8081/api/users';
  apiRoot = environment.API_URL + '/api/users';

  users: User[] = [];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.onInit();
  }

  onInit(){
    this.http.get(this.apiRoot).subscribe((res:any) => {
      console.log(res);
      this.users = res.users;
      this.usersSubject.next([...this.users]);
    })
  }

  getUsers(){
    return this.usersSubject;
  }

  addUser(user){
    this.http.post(this.apiRoot, user).subscribe((res:any) =>{
      this.users.push(res.user);
      this.usersSubject.next([...this.users]);
    })
  }

  deleteUser(user){
    this.http.delete(this.apiRoot + `/${user._id}`, user).subscribe((res:any) =>{
      this.users = this.users.filter(x => x._id != user._id);
      this.usersSubject.next([...this.users]);
    })
  }

}
