
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
  users = new UserService();
  accounts = new AccountService();

  constructor() { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }
}
