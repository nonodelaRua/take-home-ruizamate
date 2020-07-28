import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  meeting:FormGroup;
  userList:any = [];

  constructor(
    private formBuilder: FormBuilder,
    public userService: UsersService) { }

  ngOnInit() {
    this.getUsers();
    this.meeting = this.formBuilder.group({
      date: ['', Validators.required]
  });
  }

  getUsers() {
    this.userService.getUsers().subscribe((resp) => {
      this.userList = resp;
    });
  }

  onSubmit() {
    console.log(this.meeting.value.date);
  }
}
