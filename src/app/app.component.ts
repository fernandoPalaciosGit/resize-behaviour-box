import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from '../lib/services/device-detector.service';
import { DeviceBreakpoint } from '../lib/models/device-breakpoints.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hasContinueFlightBox: boolean;

  constructor(private deviceDetectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.deviceDetectorService.getDeviceBreakpointStatus()
      .subscribe(this.setViewportBreakpointMobile.bind(this));
  }

  setViewportBreakpointMobile(breakpoint: DeviceBreakpoint) {
    this.hasContinueFlightBox = breakpoint === DeviceBreakpoint.MEDIUM;
  }

  onContinueBooking(event) {
    window.alert('Continue booking');
    event.stopPropagation();
  }
}
