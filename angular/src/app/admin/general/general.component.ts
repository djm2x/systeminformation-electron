import { Component, OnInit, OnDestroy } from '@angular/core';
import { ElectronService } from '../electron.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  intervalId: any;
  constructor(private service: ElectronService) { }


  ngOnInit(): void {
    // this.intervalId = setInterval(() => this.get(), 1000);
    this.get();
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
