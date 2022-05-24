import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router, public accountService: AccountService) {
    this.router.navigate(['/']);
    this.accountService.removeToken();
  }
}
