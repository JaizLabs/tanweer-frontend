import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CourseService } from '../../admin-services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-memberships',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view-memberships.component.html',
  styleUrl: './view-memberships.component.scss'
})
export class ViewMembershipsComponent {
  currentPage = 1;
  cources = [];
  total:any;
  searchForm!: FormGroup;
  id = this.activatedRouter.snapshot.params['id'];

  constructor(private courseService: CourseService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute
  ){

    this.searchForm = this.fb.group({
      name: [null, Validators.required]
    })
    this.searchCourses();
  }

  searchCourses(){
    const data = {
      pageNumber: this.currentPage -1,
      courseId: this.id
    }
    this.courseService.getMemberships(data).subscribe(res=>{
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

  updatePaymentStatus(id){
    this.courseService.updateMembershipStatus(id).subscribe(res=>{
      this.searchCourses();
      this.message
          .success(
            `Membership Updated Successfully.`,
            { nzDuration: 5000 }
          );
    }, error=>{
      this.message
          .error(
            `${error.error}`,
            { nzDuration: 5000 }
          );
    })
  }


}
