import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user';
import {Post} from '../../models/post';

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

  title: string;
  body: string;

  previewPost: Post;

  ngOnInit(): void {}

  ngOnChanges(): void {
    if(this.post) {
      this.title = this.post.title;
      this.body = this.post.body;
    }
  }

  onPreviewClick(content): void {
    this.previewPost = {
      _id: this.post ? this.post._id : "",
      title: this.title,
      author: this.user.username,
      body: this.body,
      date: this.post ? this.post.date : new Date(Date.now()),
    };
    this.modalService.open(content, {
      size: 'lg',
      scrollable: true,
    });
  }

  onCancelEdit(): void {
    this.post = null;
    this.title = "";
    this.body = "";
  }
}

/* 

# Markdown
## is
### Awesome

**_crunchy time baby_**

Made with :heart: by Me *ofc*

```C
printf("%d\n", 69);
```

*/
