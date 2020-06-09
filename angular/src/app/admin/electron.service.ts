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

  // info: Res = null;
  isLoadingResults = false;
  infoCostume: IInfoCostume = null;

  constructor() {
    const r = sessionStorage.getItem('infoCostume');
    
    r ? this.infoCostume = JSON.parse(r).data.infoCostume : this.getAll();
  }

  setSession(infoCostume: IInfoCostume) {
    const today = new Date();
    const expires = new Date();
    expires.setDate(today.getDate() + 7);

    const sessionObject = {
      expiresAt: expires,
      data: { infoCostume },
    };
    sessionStorage.setItem('infoCostume', JSON.stringify(sessionObject));
  }

  // getSession(key: string = 'infoCostume') {
  //   const r = sessionStorage.getItem(key);
  //   if (r) {
  //     this.infoCostume = JSON.parse(r);
  //   } else {
  //     this.getAll();
  //   }
  // }

  getAll() {
    console.log('>>>>>>>>>>>>>>>>>>>>charger');
    this.isLoadingResults = true;
    this.get('getInfo').subscribe((r: Res) => {

      r = r;
      this.infoCostume = {
        proce: `${r.generalStaticData.cpu.manufacturer} ${r.generalStaticData.cpu.brand} CPU @ ${r.generalStaticData.cpu.speed}GHz (${r.generalStaticData.cpu.cores} CPUs)`,
        name: r.generalStaticData.os.hostname,
        system: `${r.generalStaticData.os.distro} ${r.generalStaticData.os.arch} bits (${r.generalStaticData.os.release})`,
        disk: r.generalStaticData.diskLayout.map(e => `${e.name} (${e.type}) ${+(e.size / 1024 / 1024 / 1024).toFixed(0)} Go`),
        mem: r.generalStaticData.memLayout.map(e => e.size).reduce((p, c) => p + c) / 1024 / 1024,
        model: r.generalStaticData.system.model,
        fabric: r.generalStaticData.system.manufacturer,
        bios: `${r.generalStaticData.bios.version} - ver : ${r.generalStaticData.bios.releaseDate}`,
        graphics: r.generalStaticData.graphics.controllers.map(e => `${e.model} ${e.vram} Mo`),
        reseau: r.generalStaticData.net.filter(e => e.operstate.includes('up'))
          .map(e => {
            return { iface: e.iface, ifaceName: e.ifaceName, ip4: e.ip4, ip6: e.ip6, mac: e.mac, dhcp: e.dhcp };
          }),
        software: r.softwares.filter(e => e.DisplayName), 
      };

      console.log(r);
      console.log(this.infoCostume);

      console.log('>>>>>>>>>>>>>>>>>>>>>done');
      this.isLoadingResults = false;

      this.setSession(this.infoCostume);
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
    DisplayIcon: string,
    RegistryDirName: string,
    DisplayName: string,
    DisplayVersion: string,
    InstallLocation: string,
    InstallDate: string,
    Publisher: string,
    EstimatedSize: string,
  }[];
}

export interface IInfoCostume {
  name: string;
  system: string;
  fabric: string;
  model: string;
  bios: string;
  proce: string;
  mem: number;
  graphics: string[];
  disk: string[];
  reseau: {
    iface: string;
    ifaceName: string;
    ip4: string;
    ip6: string;
    mac: string;
    dhcp: boolean;
  }[];
  software: {
    DisplayIcon: string,
    RegistryDirName: string;
    DisplayName: string;
    DisplayVersion: string;
    InstallLocation: string;
    InstallDate: string;
    Publisher: string;
    EstimatedSize: string;
  }[];
}
