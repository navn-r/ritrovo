import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../models/post';
import { User } from '../../models/user';


@Component({
  selector: 'app-new-post-card',
  templateUrl: './new-post-card.component.html',
  styleUrls: ['./new-post-card.component.scss'],
})
export class NewPostCardComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  @Input()
  user: User;

  @Input()
  post: Post;

  @Output()
  postEvent = new EventEmitter();

  title: string;
  body: string;

  previewPost: Post;

  infoTitle: string;
  infoSubtitle: string;

  ngOnInit(): void {
    this.revertInfoTitles();
  }

  ngOnChanges(): void {
    if (this.post) {
      this.title = this.post.title;
      this.body = this.post.body;
      this.infoTitle = `Hmm, looks like @${this.user.username} is editing a post.`;
      this.infoSubtitle = `Let's just pretend t h a t didn't happen and move on, shall we?`;
    }
  }

  onPreviewClick(content): void {
    this.setupPreviewPost();
    this.modalService.open(content, {
      size: 'lg',
      scrollable: true,
    });
  }

  onCancelEdit(): void {
    this.post = null;
    this.title = '';
    this.body = '';
    this.revertInfoTitles();
  }

  onSubmit(): void {
    console.log("submitting...");
    this.setupPreviewPost();
    this.postEvent.emit(this.previewPost);
    this.revertInfoTitles();
    this.post = null;
    this.title = '';
    this.body = '';
  }

  private setupPreviewPost(): void {
    this.previewPost = {
      _id: this.post ? this.post._id : '',
      title: this.title,
      author: this.user.username,
      body: this.body,
      date: this.post ? this.post.date : new Date(Date.now()),
    };
  }

  private revertInfoTitles(): void {
    this.infoTitle = `What's on your spaghetti, @${this.user.username}?`;
    this.infoSubtitle =
      "Don't be shy, it's not like every single user will see your post. ¯\\_(ツ)_/¯";
  }
}