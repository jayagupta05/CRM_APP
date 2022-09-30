import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ReturnResult } from 'src/app/models/return-result';
import { AccountService } from 'src/app/services/account/account.service';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TaskAssignmnetModel } from '../../assignment/assignment.page';
import { TaskDetail } from '../../task/task.page';

interface Status {
  key: string;
  value: string;
}

@Component({
  selector: 'app-submit-status',
  templateUrl: './submit-status.component.html',
  styleUrls: ['./submit-status.component.scss'],
})
export class SubmitStatusComponent implements OnInit {
  public taskDetails: TaskDetail = this.navParams.get('value');
  public isLoading: Subject<boolean> = this.loaderService.isLoading;

  status: Status[] = [];

  addStatusDetail = this.fb.group({
    status: ['', Validators.required],
    remark: [''],
  });

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public accountServices: AccountService,
    public loaderService: LoaderService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    if (this.accountServices.USER_TYPE === 'admin') {
      this.status = [
        {
          key: 'In Progress',
          value: 'in progress',
        },
        {
          key: 'Customer Pending',
          value: 'customer pending',
        },
        {
          key: 'Resolved',
          value: 'resolved',
        },
        {
          key: 'Close',
          value: 'close',
        },
      ];
    } else {
      this.status = [
        {
          key: 'In Progress',
          value: 'in progress',
        },
        {
          key: 'Customer Pending',
          value: 'customer pending',
        },
        {
          key: 'Resolved',
          value: 'resolved',
        },
      ];
    }
  }

  public onSubmitTaskStatus() {
    const taskAssign = new TaskAssignmnetModel();
    taskAssign.taskid = this.taskDetails.taskid;
    taskAssign.taskstatus = this.addStatusDetail.value.status;
    taskAssign.operationtype = 'STSUPD';
    taskAssign.remark = this.addStatusDetail.value.remark;
    taskAssign.taskassignee = this.accountServices.USER_ID;
    this.alertCtrl
      .create({
        header: 'Confirm Alert',
        subHeader: 'Are you sure you want to change Status?',
        message:
          'After Submit, Status should be changed according to your selection.',
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
            handler: () => {
              this.assignmentService
              .updateTaskDetails(taskAssign)
              .then((result: ReturnResult<any>) => {
                if (result.success) {
                  this.modalController.dismiss({
                    dismissed: true,
                    loaddata: true,
                  });
                  this.notificationService.showToast<any>(result);
                  this.assignmentService.loader.next(false);
                } else {
                  this.notificationService.showToast<any>(result);
                  this.assignmentService.loader.next(false);
                }
                });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  public dismiss(): void {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
