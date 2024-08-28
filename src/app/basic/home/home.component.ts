import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerService } from '../../customer/customer-services/customer.service';
import { UserStorageService } from '../basic-services/user-storage.service';
import { AuthService } from '../basic-services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentPage = 1;
  cources = [];
  total:any;
  searchForm!: FormGroup;

  constructor(private courseService: CustomerService,
    private authService: AuthService,
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
    this.authService.searchCourses(data).subscribe(res=>{
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

  refresh(){
    this.searchForm.reset();
    this.currentPage = 1;
    this.searchCourses();
  }

  createMembership(courseId:number){
    if(UserStorageService.isCustomerLoggedIn()){
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
    }else{
      this.message
      .error(
        `Your Need to login to subscribed this sourse.`,
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl("/login");
    }
    
  }

}
