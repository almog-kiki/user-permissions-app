import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router";
import { UserStoreService } from "../../services/user-store.service";
import * as utils from '../../lib/utils';
import { ToastrService } from 'ngx-toastr';
import * as constans from '../../lib/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly CONSTANTS = constans;
  isLoading = false;
  userFormGroup: any;
  user = {
    username:"",
    password:""
  };

  constructor(private loginService: LoginService, private router: Router, 
              private userStore:UserStoreService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      'username': new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'password': new FormControl(this.user.password, Validators.required)
    });
  }
  
  get username() {  return this.userFormGroup.get('username'); }
  get password() { return this.userFormGroup.get('password'); }

  clearFields(){
    this.userFormGroup.reset()
  }

  isFormValidate(){
    return (this.username !== null && this.password !== null)
  }

  handleSuccessfulLogin (response){
    this.isLoading = false;
    this.userStore.set(response.data)
    this.clearFields();
    utils.navigateToUrl(this.router, "/home");
  }

  handleLogin() {
    this.isLoading = true;
    const data = {
      username: this.username.value,
      password: this.password.value
    };

    if (this.isFormValidate()){
      this.loginService.login(data)
        .subscribe(
          (response: any) => { 
            this.handleSuccessfulLogin(response)
          },
          error =>{
            this.toastr.error(error ,'Error' );
            this.isLoading=false;
          });
    }
  }

  loginAsAGuest(){
    this.isLoading = true;
    this.loginService.loginAsAGuest()
      .subscribe((response: any) => { this.handleSuccessfulLogin(response)});
  }

}
