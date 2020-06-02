import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';

const ipc = (window as any).require('electron').ipcRenderer;
const remote = (window as any).require('electron').remote;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() {  }

  get0(route: string): Promise<any | any[]> {
    // remote.getCurrentWindow().reload();
    const promise = new Promise((res, rej) => ipc.prependOnceListener('angular', (event, r) => res(r)));
    // ipc.prependOnceListener('angular', (event, r) => {

    // });

    ipc.send(route);

    return promise;
  }


  get(route: string): Observable<any | any[]> {
    ipc.send(route);

    return new Observable(o => ipc.prependOnceListener('angular', (event, r) => o.next(r)));
  }
}
