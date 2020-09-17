import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { Post } from '../../models/post';


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor() { }

  @Input()
  post: Post;

  @Input()
  user: User;

  @Output()
  editPostEvent = new EventEmitter();

  @Output()
  deletePostEvent = new EventEmitter();

  ngOnInit(): void {
  }

  onEditPost() {
    this.editPostEvent.emit(this.post);
  }

  onDeletePost() {
    this.deletePostEvent.emit(this.post._id);
  }

}
