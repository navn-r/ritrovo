import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Post} from '../../models/post';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  posts: Post[];
  users: User[];

  // dummy user
  user: User = {
    _id: '5f650d014c940b5ab560f43b',
    username: 'navn',
    email: 'me@navn.me',
    password: '$2b$10$/xLd.u0ntB1Dpm7UryHLTOcyvIU6VmzzFQfPFbypZdH72qzsNCXn6',
    createdAt: new Date('2020-09-18T19:39:45.292Z'),
    updatedAt: new Date('2020-09-19T16:00:12.291Z'),
  };

  // dummy post
  post: Post = {
    _id: '5f662c7bd81e6c82685d2720',
    title: 'This is a title',
    author: '5f650d014c940b5ab560f43b',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: new Date('2020-09-19T16:06:19.752Z'),
  };

  ngOnInit(): void {

  }
}
