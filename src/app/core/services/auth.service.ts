import { Observable } from 'rxjs';
import { User, LoginRsp, SignupRsp } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/users/login`, body);
  }

  signup(body: User): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(`${environment.api_url}/users/signup`, body);
  }
}