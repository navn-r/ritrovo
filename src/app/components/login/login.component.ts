import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
  }
}
