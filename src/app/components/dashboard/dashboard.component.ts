import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  // dummy user
  user = {
    username: "navn",
    password: "1234",
    email: String
  };

  ngOnInit(): void {
  }

}
