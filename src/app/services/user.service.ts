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
    TODO: fix link before deployment
  */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/users');
  }

  /* 
    POST login user by username (used for login auth)
      - username: the username of the user
    TODO: fix link before deployment
  */
  getUser(username: string, password: string): Observable<User | boolean> {
    return this.http.post<User | boolean>(`http://localhost:5000/users/${username}`, {
      username, password
    });
  }

  /* 
    POST new user
      - newUser: the about-to-be created user
    TODO: fix link before deployment
  */
  postNewUser(newUser): Observable<any> {
    const { username, password, email } = newUser;
    return this.http.post('http://localhost:5000/users', {
      username,
      password,
      email,
    });
  }

  /* 
    POST update password
      - user: the user whose password needs to be changed
    TODO: fix link before deployment
  */
  postUpdatePassword(user: User): Observable<any> {
    const { username, password } = user;
    return this.http.post(`http://localhost:5000/users/password/${username}`, {
      password,
    });
  }

  /* 
    POST update email
      - user: the user whose email needs to be changed
    TODO: fix link before deployment
  */
  postUpdateEmail(user: User): Observable<any> {
    const { username, email } = user;
    return this.http.post(`http://localhost:5000/users/email/${username}`, {
      email,
    });
  }

  /* 
    DELETE user by username
      - username: the username of the about-to-be deleted user
    TODO: fix link before deployment
  */
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/users/${username}`);
  }
}
