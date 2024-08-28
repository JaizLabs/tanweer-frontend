import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../basic/basic-services/auth.service';
import { UserStorageService } from '../../../basic/basic-services/user-storage.service';
import { CourseService } from '../../admin-services/course.service';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent {
  validateForm!: FormGroup;
  isSpinning = false;

  submitForm(): void {
    if(this.validateForm.valid){
      this.isSpinning = true;
      this.courseService.createCourse(this.validateForm.value).subscribe(
        (res) => {
          this.message
          .success(
            `Course Created Successfully.`,
            { nzDuration: 5000 }
          );
          this.isSpinning = false;
          this.router.navigateByUrl("/admin/dashboard");
        }, error=>{
          this.message
          .error(
            `${error.error}`,
            { nzDuration: 5000 }
          );
          this.isSpinning = false;
        })
    }else{
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  constructor(private fb: FormBuilder,
    private courseService: CourseService,
    private message: NzMessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

}
