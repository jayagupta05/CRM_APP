import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/sharedmodule/confirm-password.validator';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ReturnResult } from 'src/app/models/return-result';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotpwd = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    confirmPassword: ['', [Validators.required]],
    clientCode: ['', [Validators.required]]
  },
  {
    validators: CustomValidators.passwordMatchValidator,
  }
  );

  public users: UserDetail[] = [];

  constructor(
    public accountServices: AccountService,
    public router: Router,
    public fb: FormBuilder,
    public loginService: LoginService,
    public modalController: ModalController,
    public notificationService: NotificationService
  ) { }

  isDisplayed = false;

  ngOnInit() {
  }

  public async onSubmit(){
    const userDetail = new UserDetail();
    userDetail.username = this.forgotpwd.value.username;
    userDetail.pwd = this.forgotpwd.value.password;
    this.accountServices.CLIENT_CODE = this.forgotpwd.value.clientCode;
    userDetail.operationtype = 'INSERT';
    userDetail.fullname = '';
    userDetail.email = '';
    userDetail.phone = 0;
    userDetail.active = 'y';
    if (userDetail.username = this.forgotpwd.value.username){
      this.isDisplayed = true;
    }
    this.loginService
    .getUsers(userDetail)
    .then((result: ReturnResult<any>) => {
      if (result.success) {
        this.modalController.dismiss({
          dismissed: true,
          loaddata: true,
        });
        this.notificationService.showToast<any>(result);
      } else {
        this.notificationService.showToast<any>(result);
      }
    });
  }

  public cancel(): void {
    this.accountServices.removeToken();
    this.router.navigate(['/']);
  }
}
