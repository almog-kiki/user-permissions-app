import { Component, OnInit } from '@angular/core';
import { UserStoreService } from "../../services/user-store.service";
import * as utils from '../../lib/utils';
import { Router } from "@angular/router";
import * as constans from '../../lib/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  readonly CONSTANTS = constans;
  currentUser: any;
  icon: String;

  constructor( private router: Router,
    private userStore: UserStoreService) { 
      this.currentUser = userStore.get();
      if(!this.currentUser){
        utils.navigateToLogin(router) 
      }
      this.icon = "../../../assets/" + this.userStore.get().role.name + ".png";
    }

  ngOnInit(): void {
  }


  isGuest(){
    debugger
    return this.userStore.get().role.name === "Guest";
  }

  navigateToUsersPage(){
    utils.navigateToUrl(this.router,"/users") 
  }
}
