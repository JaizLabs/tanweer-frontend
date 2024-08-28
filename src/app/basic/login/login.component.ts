import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../basic-services/auth.service';
import { UserStorageService } from '../basic-services/user-storage.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  validateForm!: FormGroup;
  isSpinning = false;

  submitForm(): void {
    if(this.validateForm.valid){
      this.isSpinning = true;
      this.authService.login(this.validateForm.value).subscribe(
        (res) => {
          if(res.userId != null){
            const user = {
              id: res.userId,
              role: res.userRole
            }
  
            UserStorageService.saveUser(user);
            UserStorageService.saveToken(res.jwt);
            console.log(user);
            UserStorageService.saveUser(user);
            if (UserStorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl('admin/dashboard');
            } else if (UserStorageService.isCustomerLoggedIn()) {
              this.router.navigateByUrl('customer/dashboard');
            }
          }
          this.isSpinning = false;
        }, error=>{
          this.message
          .error(
            `Bad credentials`,
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
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}