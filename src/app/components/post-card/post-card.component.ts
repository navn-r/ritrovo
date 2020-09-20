import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import {Post} from '../../models/post';

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

  ngOnInit(): void {
  }

  onEditPost() {
    this.editPostEvent.emit(this.post);
  }

  onDeletePost() {
    console.log("Deleting...");
  }

}
