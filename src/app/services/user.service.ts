import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Using dependency injection, inject HttpClient
  constructor(private http: HttpClient) {}

  /* 
    Current User
      - Uses local storage for persistence
  */
  user: User = JSON.parse(localStorage.getItem('user') || null);

  // Sets the user
  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // gets the user
  getCurrentUser(): User {
    return this.user;
  }

  /* 
    GET all users
  */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/users');
  }

  /* 
    POST login user by username (used for login auth)
      - username: the username of the user
  */
  getUser(username: string, password: string): Observable<User | boolean> {
    return this.http.post<User | boolean>(`/users/${username}`, {
      username,
      password,
    });
  }

  /* 
    POST new user
      - newUser: the about-to-be created user
  */
  postNewUser(newUser): Observable<any> {
    const { username, password, email } = newUser;
    return this.http.post('/users', {
      username,
      password,
      email,
    });
  }

  /* 
    POST update password
      - user: the user whose password needs to be changed
  */
  postUpdatePassword(user: User): Observable<any> {
    const { username, password } = user;
    return this.http.post(`/users/password/${username}`, {
      password,
    });
  }

  /* 
    POST update email
      - user: the user whose email needs to be changed
  */
  postUpdateEmail(user: User): Observable<any> {
    const { username, email } = user;
    return this.http.post(`/users/email/${username}`, {
      email,
    });
  }

  /* 
    DELETE user by username
      - username: the username of the about-to-be deleted user
  */
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`/users/${username}`);
  }
}
