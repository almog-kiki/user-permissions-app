import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as constans from '../../lib/constants';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @ViewChild ('frame') public modal: any;

  readonly CONSTANTS = constans;
  handleConfirmFunc: Function;
  idForRemove: any;
  msgContent: String;

  constructor() { }

  ngOnInit(): void {
  }

  showModal(msgContent: String, handleConfirmFunc: Function , idForRemove :any) {
    this.modal.show();
    this.handleConfirmFunc = handleConfirmFunc;
    this.idForRemove = idForRemove;
    this.msgContent=msgContent;
  }

  hideModal(){
    this.modal.hide();
  }

  handleConfirm(){
    this.modal.hide();
    this.handleConfirmFunc(this.idForRemove);
  }

}
