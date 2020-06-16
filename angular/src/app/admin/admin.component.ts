import { UowService } from './../services/uow.service';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SessionService } from '../shared';
import { ThemeService } from '../theme.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MediaService } from './media.service';
import { MatButton } from '@angular/material/button';
import { User } from '../Models/models';
import { routerTransition } from '../shared/animations';
import { FormControl } from '@angular/forms';
import { ElectronService } from './electron.service';
import { ApiService } from './api.service';
import { EquipementInfo } from './models';
import { TitleBarService } from '../shared/title-bar.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SheetbottomComponent } from './sheetbottom/sheetbottom.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routerTransition],
})
export class AdminComponent implements OnInit {

  @ViewChild('snav', { static: true }) snav: any;

  mobileQuery: MediaQueryList;
  tabIndex = new FormControl(0);
  opened = false;

  pages = this.routes;
  loadPercent = 0;
  isLoading = false;
  isDoneGetInfo = false;

  constructor(public session: SessionService, changeDetectorRef: ChangeDetectorRef
    , public media: MediaMatcher, public router: Router, private api: ApiService
    , public theme: ThemeService, public myMedia: MediaService, public service: ElectronService
    , private titleBar: TitleBarService, private bottomSheet: MatBottomSheet) {


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener((e: MediaQueryListEvent) => changeDetectorRef.detectChanges());
  }

  ngOnInit() {
    setTimeout(() => {
      this.snav.toggle();
    }, 300);

    this.loadingPoucentage();

    this.service.isLoadingResults.subscribe(r => {
      this.isLoading = r;
    });
  }



   loadingPoucentage() {
    const t = setInterval((e) => {
      if (this.isLoading === false) {
        clearInterval(t);

        const t2 = setInterval(() => {
          this.loadPercent += 1;
          if (this.loadPercent === 100) {
            clearInterval(t2);
            this.isDoneGetInfo = true;
            this.loadPercent = 0;
          }
        }, 10);
      }

      if (this.loadPercent === 90 && this.isLoading) {
        this.loadPercent = this.loadPercent;
      } else {
        this.loadPercent += 1;
      }
    }, 150);


  }

  reset() {
    this.service.getAll();
    this.isDoneGetInfo = false;
    this.loadingPoucentage();
  }

  get routes() {
    return [
      { path: '/admin/general', index: 0, name: 'General', icon: 'memory' },
      { path: '/admin/software', index: 0, name: 'software', icon: 'extension' },
      // { path: '/admin/system', index: 0, name: 'System', icon: 'view_list' },
      // { path: '/admin/cpu', index: 0, name: 'CPU', icon: 'view_list' },
      // { path: '/admin/memory', index: 0, name: 'Memory', icon: 'memory' },
      // { path: '/admin/battery', index: 0, name: 'Battery', icon: 'battery_std' },
      // { path: '/admin/graphics', index: 0, name: 'Graphics', icon: 'view_list' },
      // { path: '/admin/os', index: 0, name: 'OS', icon: 'power_settings_new' },
      // { path: '/admin/process', index: 0, name: 'Process', icon: 'view_list' },
      // { path: '/admin/disks', index: 0, name: 'Disks / FS', icon: 'storage' },
      // { path: '/admin/network', index: 0, name: 'Network', icon: 'settings_input_hdmi' },
      // { path: '/admin/wifi', index: 0, name: 'Wifi', icon: 'wifi' }
    ].map((e, i) => {
      e.index = i;
      return e;
    });
  }

  do(action) {
    this.titleBar.post(action);
  }

  openDialog() {
    this.bottomSheet.open(SheetbottomComponent, { data: 'me', });
  }
}


