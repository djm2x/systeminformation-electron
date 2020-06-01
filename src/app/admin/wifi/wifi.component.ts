import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../electron.service';
import { Wifi } from 'src/app/Models/models';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  wifis: Wifi[] = [];
  constructor(private service: ElectronService) { }

  ngOnInit(): void {
    // setInterval(() => this.get(), 1000);
    this.get2()
  }

  get() {
    this.service.get('wifi').subscribe(r => {
      this.wifis = r.sort((a, b) => b.quality - a.quality );
    });
  }

  get2() {
    this.service.get('getInfo').subscribe(r => {
      console.log(r)
    });
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
