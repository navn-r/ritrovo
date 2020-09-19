import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Using dependency injection, inject HttpClient
  constructor(private http: HttpClient) {}

  /* 
    GET all users
    TODO: fix link before deployment
  */
  getAllPosts(): Observable<any> {
    return this.http.get('http://localhost:5000/posts');
  }

  /* 
    GET post by id
      - id: the id of the post
    TODO: fix link before deployment
  */
  getPostById(id: string): Observable<any> {
    return this.http.get(`http://localhost:5000/posts/${id}`);
  }

  /* 
    GET posts by username
      - username: the username of the author
    TODO: fix link before deployment
  */
  getPostsByUsername(username: string): Observable<any> {
    return this.http.get(`http://localhost:5000/posts/user/${username}`);
  }

  /* 
    POST new post
      - newPost: the about-to-be posted post
    TODO: fix link before deployment
  */
  postNewPost(post: Post): Observable<any> {
    const { title, author, body } = post;
    return this.http.post(`http://localhost:5000/posts`, {
      title,
      author,
      body,
    });
  }

  /* 
    POST update title
      - post: post that needs its title updated
    TODO: fix link before deployment
  */
  postUpdateTitle(post: Post): Observable<any> {
    const { _id, title } = post;
    return this.http.post(`http://localhost:5000/title/${_id}`, {
      title,
    });
  }

  /* 
    POST update body
      - post: post that needs its body updated
    TODO: fix link before deployment
  */
  postUpdateBody(post: Post): Observable<any> {
    const { _id, body } = post;
    return this.http.post(`http://localhost:5000/body/${_id}`, {
      body,
    });
  }

  /* 
    DELETE post by id
      - id: the id of the about-to-be deleted post
    TODO: fix link before deployment
  */
  deletePostById(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/posts/${id}`);
  }

  /* 
    DELETE all posts with author=username
      - username: the author of the posts that need to be deleted
    TODO: fix link before deployment
  */
  deletePostByUsername(username: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/posts/user/${username}`);
  }
}
