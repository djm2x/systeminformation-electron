import { Injectable } from '@angular/core';
import { User } from '../Models/models';

const USER = 'USER';
const TOKEN = 'TOKEN';
const ADMIN = 'admin';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public user = new User();
  public token = '';

  constructor() {
    this.getSession();
  }

  // se connecter
  public doSignIn(user: User, token) {
    if (!user || !token) {
      return;
    }
    this.user = user;
    this.token = token;
    localStorage.setItem(USER, (JSON.stringify(this.user)));
    localStorage.setItem(TOKEN, (JSON.stringify(this.token)));
  }

  public updateUser(user: User) {
    if (!user) {
      return;
    }
    this.user = user;
    localStorage.setItem(USER, (JSON.stringify(this.user)));
  }

  // se déconnecter
  public doSignOut(): void {
    this.user = new User();
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN);
  }

  // this methode is for our auth guard
  get isSignedIn(): boolean {
    return (!!localStorage.getItem(USER)) || (!!localStorage.getItem(TOKEN));
  }

  public getSession(): void {
    try {
      if (localStorage.getItem(USER)) {
        this.user = JSON.parse(localStorage.getItem(USER));
        this.token = JSON.parse(localStorage.getItem(TOKEN));
      } else {
        this.user = new User();
        this.token = '';
      }
    } catch (error) {
      this.user = new User();
      this.token = '';
    }
  }

  get getUser() {
    return this.user;
  }

  get isAdmin() {
    return this.user.role === ADMIN;
  }
}
