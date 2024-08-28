import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ViewMembershipsComponent } from './components/view-memberships/view-memberships.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'create-course', component: CreateCourseComponent},
  {path:'course/:id/memberships', component: ViewMembershipsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
