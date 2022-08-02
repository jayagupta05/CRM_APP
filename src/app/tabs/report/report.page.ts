import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetail } from 'src/app/models/userdetail.model';
import { LoginService } from 'src/app/services/login/login.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ReturnResult } from 'src/app/models/return-result';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { ReportData } from 'src/app/models/reportdata';
import { ReportType } from 'src/app/models/reporttype';
import { ReportService } from 'src/app/services/report/report.service';

interface Status {
  key: string;
  value: string;
}

export class ReportModel{
  userid: number;
  startdate : Date;
  enddate : Date;
  status : string;
  taskassignee : string;
  reporttypecode : string;
}

export class ReportTask{
  taskid: number;
  taskdate: Date;
  customername: string;
  location: string;
  phone: number;
  status: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})

export class ReportPage implements OnInit {

  public Test:string='Report'
  public users: UserDetail[] = [];
  public report: ReportType[] = [];
  public reportData: any[];
 // public reportData: ReportTask[] = [];
  status: Status[] = [];

  constructor(
    public accountServices: AccountService,
    public _http: HttpClient,
    public loginService: LoginService,
    public assignmentService: AssignmentService,
    public notificationService: NotificationService,
    public router: Router,
    public reportService: ReportService
  ) { }

  addReport = new FormGroup({
    fromdate: new FormControl('',Validators.required),
    todate: new FormControl('',Validators.required),
    status: new FormControl(''),
    taskassignee: new FormControl(''),
    reporttypecode: new FormControl('')
  });

  get fromdate(){
    return this.addReport.get('fromdate');
  }
  get todate(){
    return this.addReport.get('todate');
  }

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

  public async ionViewDidEnter() {
    await this.getUsers();
    await this.getReportType();
  }

  public getUsers() {
    const userDetail = new UserDetail();
    userDetail.operationtype = 'GETUSER';
    this.loginService
      .getUsers(userDetail)
      .then((result: ReturnResult<UserDetail[]>) => {
        if (result.success) {
          this.users = result.data;
        } else {
          this.notificationService.showToast<UserDetail[]>(result);
        }
      });
  }

  public getReportType(){
    const reportType = new ReportType();
    this.reportService
      .getReportType(reportType)
      .then((result: ReturnResult<ReportType[]>) => {
        if(result.success) {
            this.report = result.data;
          } else {
            this.notificationService.showToast<ReportType[]>(result);
          }
      });
  }
 
  public async onReportData(){
   const reportModel = new ReportModel();
   reportModel.startdate = this.addReport.value.fromdate;
   reportModel.enddate = this.addReport.value.todate;
   reportModel.status = !this.addReport.value.status ? null : this.addReport.value.status;
   reportModel.taskassignee = !this.addReport.value.taskassignee ? null : this.addReport.value.taskassignee;
   reportModel.reporttypecode = this.addReport.value.reporttypecode;
   this.reportService
   .getReportData(reportModel)
   .then((result: ReturnResult<ReportData[]>) => {
    if(result.success) {
      this.reportData = result.data;
    } else{
      this.notificationService.showToast<ReportData[]>(result);
    }
   });
  }

}
