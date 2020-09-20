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
  */
  getAllPosts(): Observable<any> {
    return this.http.get('/posts');
  }

  /* 
    GET post by id
      - id: the id of the post
  */
  getPostById(id: string): Observable<any> {
    return this.http.get(`/posts/${id}`);
  }

  /* 
    GET posts by username
      - username: the username of the author
  */
  getPostsByUsername(username: string): Observable<any> {
    return this.http.get(`/posts/user/${username}`);
  }

  /* 
    POST new post
      - newPost: the about-to-be posted post
  */
  postNewPost(post: Post): Observable<any> {
    const { title, author, body } = post;
    return this.http.post(`/posts`, {
      title,
      author,
      body,
    });
  }

  /* 
    POST update post
      - post: post that needs its body updated
  */
  postUpdatePost(post: Post): Observable<any> {
    const { _id, title, body } = post;
    return this.http.post(`/posts/${_id}`, {
      title,
      body,
    });
  }

  /* 
    DELETE post by id
      - id: the id of the about-to-be deleted post
  */
  deletePostById(id: string): Observable<any> {
    return this.http.delete(`/posts/${id}`);
  }

  /* 
    DELETE all posts with author=username
      - username: the author of the posts that need to be deleted
  */
  deletePostByUsername(username: string): Observable<any> {
    return this.http.delete(`/posts/user/${username}`);
  }
}
