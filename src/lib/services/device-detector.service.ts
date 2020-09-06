import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { DeviceBreakpoint } from '../models/device-breakpoints.model';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  private breakpointStatus = new BehaviorSubject<DeviceBreakpoint>(-1);

  constructor() {
    fromEvent(window, 'resize').subscribe(this.onDesktopResize.bind(this));
    this.onDesktopResize({target: window});
  }

  onDesktopResize(event) {
    this.breakpointStatus.next(this.getBreakpointFromViewportWith(event.target.innerWidth));
  }

  private getBreakpointFromViewportWith(innerWidth: number): DeviceBreakpoint {
    return DeviceBreakpoint[Object.keys(DeviceBreakpoint)
      .find((breakpoint: string) => DeviceBreakpoint[breakpoint] >= innerWidth)];
  }

  public getDeviceBreakpointStatus(): Observable<DeviceBreakpoint> {
    return this.breakpointStatus.asObservable().pipe(distinctUntilChanged());
  }
}
