import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  post(authData: any = {}, type: string){
    return this.httpClient.post<any>(`http://localhost:5001/authAPI/${type}`, authData, { observe: 'response', withCredentials: true, headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt-at')}`}})
  }
}
