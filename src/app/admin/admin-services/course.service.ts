import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/basic-services/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  createCourse(courseDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "api/admin/course", courseDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchCourses(courseDto:any): Observable<any>{
    return this.http.post(BASIC_URL+ `api/admin/course/search`, courseDto,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getMemberships(membershipDto:any): Observable<any>{
    return this.http.post(BASIC_URL+ `api/admin/course/memberships`, membershipDto,{
      headers: this.createAuthorizationHeader(),
    })
  }

  updateMembershipStatus(id:number): Observable<any>{
    return this.http.put(BASIC_URL+ `api/admin/course/membership/${id}/status-update`, {},{
      headers: this.createAuthorizationHeader(),
    })
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
