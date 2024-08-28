import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyLearningsComponent } from './components/my-learnings/my-learnings.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'my-learnings', component: MyLearningsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
