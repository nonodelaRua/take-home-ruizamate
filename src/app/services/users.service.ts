import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userJSONURL:string = '../../assets/users.json';

  constructor(private http:HttpClient) {}

  getUsers() {
    console.log('Consuming data from users service');
    return this.http.get(this.userJSONURL);
  }
}
