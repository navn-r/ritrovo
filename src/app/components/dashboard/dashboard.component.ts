import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private postService: PostService) {}

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

  post: Post;

  ngOnInit(): void {
    this.getAllPosts();
  }

  getNumPosts(): number {
    return this.posts.filter(post => post.author === this.user.username).length;
  }

  editPostHandler($event: Post): void {
    this.post = $event;
  }

  deletePostHander($event: string): void {
    this.postService.deletePostById($event).subscribe((res) => {
      console.log(res);
      this.getAllPosts();
    });
  }

  newPostHandler($event: Post): void {
    if ($event._id.length)
      this.postService.postUpdatePost($event).subscribe((res) => {
        console.log(res);
        this.getAllPosts();
      });
    else
      this.postService.postNewPost($event).subscribe((res) => {
        console.log(res);
        this.getAllPosts();
      });
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (posts) => (this.posts = posts.reverse()),
      (err) => console.log(err)
    );
  }
}
