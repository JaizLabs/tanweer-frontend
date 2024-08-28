import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/basic-services/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  searchCourses(courseDto:any): Observable<any>{
    return this.http.post(BASIC_URL+ `api/customer/course/search`, courseDto,{
      headers: this.createAuthorizationHeader(),
    })
  }

  createMembership(membershipDto:any): Observable<any>{
    return this.http.post(BASIC_URL+ `api/customer/course/membership`, membershipDto,{
      headers: this.createAuthorizationHeader(),
    })
  }

  getMyLearnings(myLearningsDto:any): Observable<any>{
    return this.http.post(BASIC_URL+ `api/customer/course/my-learnings`, myLearningsDto,{
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

