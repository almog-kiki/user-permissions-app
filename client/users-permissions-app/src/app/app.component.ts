import { Component } from '@angular/core';
import * as constans from './lib/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly CONSTANTS = constans;
  title = 'users-permissions-app';
}
