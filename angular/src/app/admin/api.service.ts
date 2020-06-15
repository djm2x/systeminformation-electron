import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { User } from '../Models/models';
import { EquipementInfo } from './models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  post(model: EquipementInfo) {
    console.log(this.url)
    return this.http.post(`${this.url}/equipementInfos/post`, model);
  }

}
