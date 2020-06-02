import { Injectable, Injector, InjectionToken, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';


const KEY_THEME = 'THEME01';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  @HostBinding('class.default-theme') defaultTheme = true;
  @HostBinding('class.dark-theme') darkTheme = false;
  constructor(private overlayContainer: OverlayContainer) { }

  changeTheme(theme) {
    switch (theme) {
      case 'dark-theme':
        console.log('>>>>>>>>>>>>>');
        this.defaultTheme = false;
        this.darkTheme = true;
        break;
      default:
        this.darkTheme = false;
        this.defaultTheme = true;
        break;
    }
    this.themeForBtnNav(theme);
  }

  themeForBtnNav(theme) {
    // this.themeClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(theme);
  }

  setThemeChoosing(theme) {
    localStorage.setItem(KEY_THEME, btoa(JSON.stringify(theme)));
  }

  getThemeUsed() {
    if (localStorage.getItem(KEY_THEME)) {
      const theme = JSON.parse(atob(localStorage.getItem(KEY_THEME)));
    }
  }
}
