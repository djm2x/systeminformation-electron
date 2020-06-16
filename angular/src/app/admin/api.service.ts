import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { EquipementInfo } from './models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  post(url, model: EquipementInfo) {
    return this.http.post(`${url === '' ? this.url : url}/api/equipementInfos/post`, model);
  }

}
