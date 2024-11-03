import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlowbiteService } from './services/flowbite.service';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, ScrollButtonComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _isDesktop?: boolean;


  constructor(private _flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      console.log(
        "Oh, hi there. My name is Mauricio González. I'm using the amazing Flowbite components library:",
        flowbite
      );
    });

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
    } else {
      this._isDesktop = false;
    }
  }


  get getIsDesktopStatus(): boolean {
    return this._isDesktop ?? false;
  }
}
