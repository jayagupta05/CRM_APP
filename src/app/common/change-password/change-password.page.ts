import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/sharedmodule/confirm-password.validator';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { ReturnResult } from 'src/app/models/return-result';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(
    public accountServices: AccountService,
    public router: Router,
    public modalController: ModalController,
    public fb: FormBuilder,
    public notificationService: NotificationService,
    public loginService: LoginService
  ) { }
  
  changepwd = this.fb.group({
    oldpwd: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    confirmPassword: ['', [Validators.required]]
  },
  {
    validators: CustomValidators.passwordMatchValidator,
  }
  );

  ngOnInit() {
  }

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
      loaddata: false,
    });
  }

  public async pwdChange(){
    const userDetail = new UserDetail();
    userDetail.userid = this.accountServices.USER_ID;
    userDetail.pwd = this.changepwd.value.password;
    userDetail.fullname = '';
    userDetail.email = '';
    userDetail.phone = 0;
    userDetail.active = 'y';
    userDetail.operationtype = 'INSERT';
    if (userDetail.pwd = this.changepwd.value.oldpwd){

    }
    this.loginService
    .getUsers(userDetail)
    .then((result: ReturnResult<any>) => {
      if (result.success) {
        this.accountServices.setAccessToken(result.data);
        this.accountServices.USER_NAME = result.data.username;
        this.accountServices.USER_ID = result.data.userid;
        this.accountServices.USER_TYPE = result.data.usertype;
        this.accountServices.CLIENT_CODE = userDetail.clientcode;
        this.router.navigate(['tabs/home']);
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

}

