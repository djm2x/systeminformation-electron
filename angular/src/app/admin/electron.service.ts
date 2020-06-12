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
  isLoadingResults = false;
  systemSerial = '';
  infoCostume: {
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
  } = null;

  constructor() {
    console.log('>>>>>>>>>>>>>>>>>>>>charger');
    this.isLoadingResults = true;
    this.get('getInfo').subscribe((r: Res) => {

      this.info = r;
      this.systemSerial = r.generalStaticData.system.serial;
      this.infoCostume = {
        proce: `${this.info.generalStaticData.cpu.manufacturer} ${this.info.generalStaticData.cpu.brand} CPU @ ${this.info.generalStaticData.cpu.speed}GHz (${this.info.generalStaticData.cpu.cores} CPUs)`,
        name: this.info.generalStaticData.os.hostname,
        system: `${this.info.generalStaticData.os.distro} ${this.info.generalStaticData.os.arch} bits (${this.info.generalStaticData.os.release})`,
        disk: this.info.generalStaticData.diskLayout.map(e => `${e.name} (${e.type}) ${+(e.size / 1024 / 1024 / 1024).toFixed(0)} Go`),
        mem: this.info.generalStaticData.memLayout.map(e => e.size).reduce((p, c) => p + c) / 1024 / 1024,
        model: this.info.generalStaticData.system.model,
        fabric: this.info.generalStaticData.system.manufacturer,
        bios: `${this.info.generalStaticData.bios.version} - ver : ${this.info.generalStaticData.bios.releaseDate}`,
        graphics: this.info.generalStaticData.graphics.controllers.map(e => `${e.model} ${e.vram} Mo`),
        reseau: this.info.generalStaticData.net.filter(e => e.operstate.includes('up'))
          .map(e => {
            return { iface: e.iface, ifaceName: e.ifaceName, ip4: e.ip4, ip6: e.ip6, mac: e.mac, dhcp: e.dhcp};
          }),
        software: this.info.softwares,
      };

      console.log(r);
      console.log(this.infoCostume);

      console.log('>>>>>>>>>>>>>>>>>>>>>done');
      this.isLoadingResults = false;
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
