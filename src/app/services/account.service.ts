import { SuperService } from './super.service';
import { Injectable } from '@angular/core';
import { User } from '../Models/models';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends SuperService<User> {

  constructor() {
    super('accounts');
  }

  login(model) {
    return this.http.post(`${this.urlApi}/${this.controller}/login`, model);
  }

  create(model) {
    return this.http.post(`${this.urlApi}/${this.controller}/create`, model);
  }

}
