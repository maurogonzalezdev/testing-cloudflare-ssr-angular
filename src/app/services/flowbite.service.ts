import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ThemeSwitcherService } from './theme-switcher.service';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: any,
    private themeSwitcherService: ThemeSwitcherService
  ) {}

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this._platformId)) {
      import('flowbite').then((flowbite) => {
        callback(flowbite);
this.themeSwitcherService.ngOnInit();
      });
    }
  }
}
