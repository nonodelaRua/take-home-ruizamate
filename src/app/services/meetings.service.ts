import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  meetingsJSONURL:string = '../../assets/meetings.json';

  constructor(private http:HttpClient) {}

  getMeetings() {
    console.log('Consuming data from meeting service');
    return this.http.get(this.meetingsJSONURL);
  }
}
