import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;

  username: string = '';
  password: string = '';
  email: string = '';

  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
  }

  loginHandler() {
    this.userService.getUser(this.username, this.password).subscribe(res => {
      if(res === false) {
        this.errorMessage = "Incorrect Password!"
      } else {
        this.userService.setUser(<User>res);
        this.router.navigate(['dashboard']);
      }
    }, err => {
      console.log(err);
      this.errorMessage = err.error;
    })
  }

  registerHandler() {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email
    };
     this.userService.postNewUser(user).subscribe(res => {
      this.loginHandler();
     }, err => {
      console.log(err); 
      if(err.error.message)
        this.errorMessage = err.error.message;
      else if(err.error.keyPattern.username) {
        this.errorMessage = `'${err.error.keyValue.username}' already exists.`;
      }
      });
  }

  checkDetails() {
    const check: boolean = (this.username.length > 3) && this.password.length > 3;
    return this.isLogin ? !check : !check || !(this.email.length > 3);
  }
}
