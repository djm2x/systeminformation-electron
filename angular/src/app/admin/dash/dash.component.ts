import { Component, OnInit } from '@angular/core';
import { Wifi } from 'src/app/Models/models';
import { ElectronService } from '../electron.service';

const ipc = (window as any).require('electron').ipcRenderer;
const remote = (window as any).require('electron').remote;

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  wifis: Wifi[] = [];
  pages = this.routes;
  constructor(public service: ElectronService) { }

  ngOnInit(): void {

    // this.f();
    // setInterval(() => this.wifi(), 1000);


    // console.log('ddddddddd')
  }

  hexToDecimal(hex: string) {
    return (parseInt(hex, 16) / 1024).toFixed(0);
  }

  f() {
    // remote.getCurrentWindow().reload();
    ipc.prependOnceListener('angular', (event, r) => {
      console.log(r);
    });

    ipc.send('getInfo', 'plz click for me');
  }

  wifi() {
    // remote.getCurrentWindow().reload();
    ipc.prependOnceListener('angular', (event, r: Wifi[]) => {
      this.wifis = r.sort((a, b) => b.quality - a.quality);
    });

    ipc.send('wifi');
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  get routes() {
    return [
      { path: '/admin/system', name: 'System', icon: 'view_list' },
      { path: '/admin/cpu', name: 'CPU', icon: 'view_list' },
      { path: '/admin/general', name: 'General', icon: 'view_list' },
      { path: '/admin/memory', name: 'Memory', icon: 'memory' },
      { path: '/admin/battery', name: 'Battery', icon: 'battery_std' },
      { path: '/admin/graphics', name: 'Graphics', icon: 'view_list' },
      { path: '/admin/os', name: 'OS', icon: 'power_settings_new' },
      { path: '/admin/process', name: 'Process', icon: 'view_list' },
      { path: '/admin/disks', name: 'Disks / FS', icon: 'storage' },
      { path: '/admin/network', name: 'Network', icon: 'settings_input_hdmi' },
      { path: '/admin/wifi', name: 'Wifi', icon: 'wifi' }
    ];
  }

}
