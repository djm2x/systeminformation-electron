import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';
import * as si from 'systeminformation';
import { EquipementInfo } from './models';

const ipc = (window as any).require('electron').ipcRenderer;
const remote = (window as any).require('electron').remote;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  // info: Res = null;
  isLoadingResults = new BehaviorSubject(true) ;

  o = new EquipementInfo();

  infoCostume: IInfoCostume = null;


  constructor() {
    const r = sessionStorage.getItem('infoCostume');

    if (r) {
      this.infoCostume = JSON.parse(r).data.infoCostume;
      this.o.nSerie = this.infoCostume.serial;

      this.isLoadingResults.next(false);
    } else {
      this.getAll();
    }
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
    this.isLoadingResults.next(true);
    this.get('getInfo').subscribe((r: Res) => {


      // this.info = r;
      this.o.nSerie = r.generalStaticData.system.serial;

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
        serial: r.generalStaticData.system.serial,
      };

      this.o.nSerie = this.infoCostume.serial;

      console.log(r);
      console.log(this.infoCostume);

      console.log('>>>>>>>>>>>>>>>>>>>>>done');
      this.isLoadingResults.next(false);

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
  serial: string;
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
