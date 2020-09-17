import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  @Input()
  user: User;

  @Input()
  numPosts: number;

  ngOnInit(): void {
  }

  logOutHandler(): void {
    this.userService.setUser(null);
    this.router.navigate(['login']);
  }

}
