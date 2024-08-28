import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CourseService } from '../../admin-services/course.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private courseService: CourseService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder
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

  
  refresh(){
    this.searchForm.reset();
    this.currentPage = 1;
    this.searchCourses();
  }

}
