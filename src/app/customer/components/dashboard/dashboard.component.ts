import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerService } from '../../customer-services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserStorageService } from '../../../basic/basic-services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentPage = 1;
  cources = [];
  total:any;
  searchForm!: FormGroup;

  constructor(private courseService: CustomerService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private router: Router,
  ){

    this.searchForm = this.fb.group({
      name: [null, Validators.required]
    })
    this.searchCourses();
  }

  searchCourses(){
    const data = {
      pageNumber: this.currentPage -1,
      name: this.searchForm.get("name").value
    }
    this.courseService.searchCourses(data).subscribe(res=>{
      console.log(res);
      this.cources = res.content;
      this.total = res.totalElements;
    })
  }

  pageIndexChange(value: any){
    this.currentPage = value;
    this.searchCourses();
  }

  submitForm(){
    this.currentPage = 1;
    this.searchCourses();
  }

  createMembership(courseId:number){
    const data = {
      courseId: courseId,
      userId: UserStorageService.getUserId()
    }
    this.courseService.createMembership(data).subscribe(res=>{
      this.message
          .success(
            `Course Subscribed Successfully.`,
            { nzDuration: 5000 }
          );
          this.router.navigateByUrl("/customer/my-learnings");
    }, error=>{
      this.message
          .error(
            `${error.error}`,
            { nzDuration: 5000 }
          );
    })
  }

  
  refresh(){
    this.searchForm.reset();
    this.currentPage = 1;
    this.searchCourses();
  }

}
