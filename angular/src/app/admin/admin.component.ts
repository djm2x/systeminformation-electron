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
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routerTransition],
})
export class AdminComponent implements OnInit {
  @ViewChild('btndev', { static: true }) btndev: MatButton;
  @ViewChild('snav', { static: true }) snav: any;
  keyDevTools = '';
  panelOpenState = false;
  mobileQuery: MediaQueryList;
  currentSection = 'section1';
  userImg = '../../assets/caisse.jpg';
  opened = false;
  idRole = -1;
  isConnected = false;
  // montantCaisse = this.s.notify;
  route = this.router.url;
  user = new User();
  pages = this.routes;
  // categories = this.uow.categories.get();
  constructor(public session: SessionService, changeDetectorRef: ChangeDetectorRef
    , public media: MediaMatcher, public router: Router, private uow: UowService
    , public theme: ThemeService, public myMedia: MediaService) {


    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.mobileQuery.addListener((e: MediaQueryListEvent) => changeDetectorRef.detectChanges());
  }

  ngOnInit() {

    // this.myMedia.windowSizeChanged.subscribe(r => {
    //   console.log(r)
    // })


    // this.getRoute();
    setTimeout(() => {
      this.user = this.session.user;
      // console.log(this.user);
      this.snav.toggle();
    }, 300);

  }

  changeTheme(theme) {
    this.theme.changeTheme(theme)
  }

  get patchRoute() { return this.route.split('/'); }

  getRoute() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        this.route = route.url;
        console.log(this.route);
      }
    });
  }



  disconnect() {
    this.router.navigate(['/auth']);
    this.session.doSignOut();
  }

  getState(outlet: RouterOutlet) {
    // console.log(outlet)
    return outlet.activatedRouteData.state;
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
