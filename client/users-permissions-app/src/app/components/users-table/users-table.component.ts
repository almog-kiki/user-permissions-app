import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserStoreService } from "../../services/user-store.service";
import * as utils from '../../lib/utils';
import { Router } from "@angular/router";
import { forkJoin } from 'rxjs';
import * as constans from '../../lib/constants';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component'

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @ViewChild (ConfirmModalComponent) public confirmModal: ConfirmModalComponent;
  
  readonly CONSTANTS = constans;
  editField: string;
  isLoading = true;
  users: any;
  roles: any;
  currentUser: any;

  constructor( private userService: UserService, 
                  private router: Router,
                  private userStore: UserStoreService,
                  private toastr: ToastrService) 
            {
                this.currentUser = userStore.get();
                if(!this.currentUser){
                  utils.navigateToLogin(router) 
                }
                userStore.getUsers().subscribe((users) => {
                  this.users = users;
                });
            }

  ngOnInit(): void {
    let allUsers = this.userService.getAll();
    let roles = this.userService.getRoles();
    forkJoin([allUsers, roles]).subscribe((results:any) => {
      this.userStore.setUsers(results[0].data);
      this.roles = results[1].data;
      this.isLoading= false
    });
  }
 
  openModalConfirmation(msgContent: String, func:Function , id: any){
    this.confirmModal.showModal(msgContent, func, id)
  }

  remove = (id: any)=> {
    this.userService.delete(id).subscribe( response => {
      this.toastr.success("User removed successfully","");
      this.refreshList(); 
      },
      error => {
        console.log(error);
        this.toastr.error("User deletion failed " ,'Error' );
      });
  }

  isAdministrator(){
    if(!this.roles){ return false; }
    return (this.currentUser && this.currentUser.role.id === this.roles[0].id)
  }

  retrieveUsers() {
    this.isLoading = true;
    this.userService.getAll()
       .subscribe(
        (response: any)=> {
           this.userStore.setUsers(response.data);
          this.isLoading = false;
        });
  }

  refreshList() {
    this.retrieveUsers();
  }

  removeAllUsers = () =>{
    this.userService.deleteAll().subscribe(response => {
      this.toastr.success("Users removed successfully","");
      this.retrieveUsers();
    }, error => {
      this.toastr.error("Users deletion failed" ,'Error' );
    });
  }

}
