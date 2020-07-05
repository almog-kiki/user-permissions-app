import { Injectable } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private users: BehaviorSubject<any>;

  constructor(private sg: SimpleGlobal) {
    this.sg['user'] = null;
    this.users = new BehaviorSubject<any>([]);
  }

  setUsers(updateUsers): void {
    this.users.next(updateUsers);
  }

  getUsers(): Observable<any> {
    return this.users.asObservable();
  }


  get(){
    return this.sg['user'];
  }

  set(user){
   this.sg['user']=user;
  }
}
