import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from '../electron.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  intervalId: any;
  date = new Date();
  constructor(public service: ElectronService) { }


  ngOnInit(): void {
    // this.intervalId = setInterval(() => this.get(), 1000);
    // this.get();
    setInterval(() => this.date = new Date(), 1000);
  }

  get() {
    this.service.get('wifi').subscribe(r => {
      console.log(r);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}
