
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { routerTransition } from './shared/animations';
import { SplashScreenService } from './shared/splash-screen.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent implements OnInit {
  constructor(private splash: SplashScreenService) { }

  ngOnInit() {
  }
}
