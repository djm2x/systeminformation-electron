import { SuperService } from './super.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService extends SuperService<any> {

  constructor() {
    super('users');
  }

  getAll(startIndex, pageSize, sortBy, sortDir) {
    return this.http.get(
      `${this.urlApi}/${this.controller}/getAll/${startIndex}/${pageSize}/${sortBy}/${sortDir}`
      );
  }

}
