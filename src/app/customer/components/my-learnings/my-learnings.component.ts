import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerService } from '../../customer-services/customer.service';
import { UserStorageService } from '../../../basic/basic-services/user-storage.service';

@Component({
  selector: 'app-my-learnings',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './my-learnings.component.html',
  styleUrl: './my-learnings.component.scss'
})
export class MyLearningsComponent {

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
    this.searchMyLearnings();
  }

  searchMyLearnings(){
    const data = {
      pageNumber: this.currentPage -1,
      userId: UserStorageService.getUserId()
    }
    this.courseService.getMyLearnings(data).subscribe(res=>{
      console.log(res);
      this.cources = res.content;
      this.total = res.totalElements;
    })
  }

  pageIndexChange(value: any){
    this.currentPage = value;
    this.searchMyLearnings();
  }
}
