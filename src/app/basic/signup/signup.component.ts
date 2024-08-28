import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../basic-services/auth.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router) { }

  validateForm!: FormGroup;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if(this.validateForm.valid){
      this.isSpinning = true;
      this.authService.register(this.validateForm.value).subscribe((res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.message
            .success(
              `Signup successful`,
              { nzDuration: 5000 }
            );
          this.router.navigateByUrl('/login');
        } else {
          this.message
            .error(
              `${res.message}`,
              { nzDuration: 5000 }
            )
        }
      }, error=>{
        this.isSpinning = false;
        this.message
        .error(
          `${error.error}`,
          { nzDuration: 5000 }
        )
      }
      )
    }else{
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
   
  }

}
