import { Component,ViewChild, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UserService } from '../../services/user.service';
import { UserStoreService } from "../../services/user-store.service";
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import * as constans from '../../lib/constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {
  @ViewChild ('frame') public modal: any;

  readonly CONSTANTS = constans;
  userFormGroup: any;
  isLoading = true;
  roles = [];
  newUser = {
    username:"",
    password:"",
    role: null
  };

  constructor(private userService: UserService, private userStore: UserStoreService, private toastr: ToastrService) { }

  showModal() {
    this.clearFields()
    this.modal.show();
  }

  hideModal(){
    this.modal.hide();
  }

  get username() {  return this.userFormGroup.get('username'); }
  get password() { return this.userFormGroup.get('password'); }

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      'username': new FormControl(this.newUser.username, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'password': new FormControl(this.newUser.password, Validators.required),
      'roleControle': new FormControl(true,  Validators.required)
    });

    this.userService.getRoles().subscribe( (response: any)=> { 
      this.roles = response.data;
      this.isLoading = false;
    });
  }


  AddNewUser(){
    this.isLoading = true;
    const data = {
      username: this.username.value,
      password: this.password.value,
      role: this.newUser.role
    }
    if (this.isFormValidate()){
      this.userService.create(data).subscribe((response: any) => { 
         this.userService.getAll().subscribe((response: any)=> {
            this.userStore.setUsers(response.data);
            this.hideModal();
            this.isLoading = false;
            this.toastr.success("User added successfully","");
            })
          });
    }else{
      this.toastr.error("please fill all the form" ,'Error' );
    }
  }

  onSelectionChange(selectedRole) {
    this.newUser.role = selectedRole;
  }

  isFormValidate(){
    return (this.username.errors === null && this.password.errors === null && this.newUser.role !== null )
  }

  clearFields(){
    this.userFormGroup.reset();
    this.newUser.role = null;
    $('input[name=radiogroup]').prop('checked', false);
  }

}
