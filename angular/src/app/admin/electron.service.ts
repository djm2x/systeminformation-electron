import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';
import * as si from 'systeminformation';

const ipc = (window as any).require('electron').ipcRenderer;
const remote = (window as any).require('electron').remote;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  info: Res = null;
  constructor() {
    this.get('getInfo').subscribe((r: Res) => {
      console.log(r);
      console.log('>>>>>>>>>>>>>>>>>>>>>done')
    });
  }


  get(route: string): Observable<any | any[]> {
    ipc.send(route);

    return new Observable(o => ipc.prependOnceListener('angular', (event, r) => o.next(r)));
  }
}

export interface Res {
  generalStaticData: si.Systeminformation.StaticData;
  memoire: si.Systeminformation.MemData;
  // system: si.Systeminformation.SystemData;
  // bios: si.Systeminformation.BiosData;
  // baseboard: si.Systeminformation.BaseboardData;
  // chassis: si.Systeminformation.ChassisData;
  wifiNetworks: si.Systeminformation.WifiNetworkData[];
  softwares: {
    RegistryDirName: string,
    DisplayName: string,
    DisplayVersion: string,
    InstallLocation: string,
    Publisher: string,
  }[];
}
