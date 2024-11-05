import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlowbiteService } from './services/flowbite.service';

import { MobileNavigationBarComponent } from './components/navigation-bar/mobile-navigation-bar.component';
import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';
import { DesktopNavigationBarComponent } from './components/desktop-navigation-bar/desktop-navigation-bar.component';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MobileNavigationBarComponent,
    ScrollButtonComponent,
    DesktopNavigationBarComponent,
    FooterComponent,
    TranslateModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _isDesktop: boolean = true;

  constructor(
    private _flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private _platformId: any,
  ) {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      console.log(
        "Oh, hi there. My name is Mauricio González. I'm using the amazing Flowbite components library:",
        flowbite
      );
    });

    if (isPlatformBrowser(this._platformId)) {
      window.addEventListener('resize', ({ target }: UIEvent) => {
        let e = target as Window;
        if (e.innerWidth >= 1024) {
          this._isDesktop = true;
        } else {
          this._isDesktop = false;
        }
      });

      if (window.innerWidth >= 1024) {
        this._isDesktop = true;
        this._removeLoaderSpinner(80);
      } else {
        this._isDesktop = false;
        this._removeLoaderSpinner(80);
      }
    }
  }

  get getIsDesktopStatus(): boolean {
    return this._isDesktop ?? false;
  }

  private _removeLoaderSpinner(time: number): void {
    setTimeout(() => {
      document.querySelector('#loader')?.classList.add('invisible');
    }, time);
  }
}
