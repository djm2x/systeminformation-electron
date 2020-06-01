import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  readonly windowSizeChanged = new BehaviorSubject<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  } as WindowSize);

  constructor() {
    this.some();
  }

  private some() {
    fromEvent(window, 'resize').pipe(
      auditTime(100),
      map((event: any) => {
        return { width: event.currentTarget.innerWidth, height: event.currentTarget.innerHeight } as WindowSize;
      })
    ).subscribe((windowSize) => {
      this.windowSizeChanged.next(windowSize);
    });
  }

  // @HostListener('window:resize', ['$event'])
  // getScreenSize(event?) {
  //   this.scrHeight = window.innerHeight;
  //   this.scrWidth = window.innerWidth;
  //   console.log(this.scrHeight, this.scrWidth);
  // }
}


export interface WindowSize {
  height: number;
  width: number;
}
