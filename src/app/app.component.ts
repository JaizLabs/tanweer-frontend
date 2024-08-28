import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserStorageService } from './basic/basic-services/user-storage.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TanweerWeb';

  isCustomerLoggedIn:boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean= UserStorageService.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name === "NavigationEnd"){
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
      }
    })
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('/')
  }
}
