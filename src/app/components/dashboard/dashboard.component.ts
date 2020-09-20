import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private postService: PostService, private userService: UserService) {}

  posts: Post[];

  user: User;

  post: Post;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getAllPosts();
  }

  getNumPosts(): number {
    if(this.posts)
      return this.posts.filter(post => post.author === this.user.username).length;
    else 
      return 0;
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
