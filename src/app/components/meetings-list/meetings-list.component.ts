import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/services/meetings.service';

import { Moment } from 'moment';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})
export class MeetingsListComponent implements OnInit {
  
  meeting:FormGroup;
  meetingsList:any = [];
  usersList:any = [];
  filteredUsersList:any = [];
  filter:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private meetingsService: MeetingsService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.initMeetingForm();
    this.getUsers();
    this.getMeetings();
  }

  initMeetingForm() {
    this.meeting = this.formBuilder.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      members: [[0], Validators.required]
    });
  }

  getMeetings() {
    this.meetingsService.getMeetings().subscribe((resp) => {
      this.formatDates(resp);
    });
  }

  formatDates(datesArr:any) {

    datesArr.forEach((date, index) => {
      datesArr[index]['date'] = moment(date['start']).format('L');
      datesArr[index]['start'] = moment(date['start']).format('LT');
      datesArr[index]['end'] = moment(date['end']).format('LT');
    });

    this.meetingsList = datesArr;

    let newList = this.meetingsList.filter(meet => meet.members.includes(2));
    console.log(newList);
  }

  getUsers() {
    this.usersService.getUsers().subscribe((resp) => {
      this.usersList = resp;
      this.initFilter();
    });
  }

  initFilter() {
    this.usersList.forEach((user, index) => {
      this.filter[index] = false;
    });
  }

  onFilter() {
    let res_filtrados:any = [];
    let filtrados:any = [];
    res_filtrados = this.meetingsList.filter(meet=>{
      let fff = meet.members.filter(m=>{
        this.filter.forEach(element => {
          console.log(m);
          console.log(element);
          
        });
      });
      // filtrados = Array.from(new Set(res_filtrados))
    });
    console.log('FILTRADOS');
  }

  onSubmit() {
    console.log(this.meeting.value);
  }

}
