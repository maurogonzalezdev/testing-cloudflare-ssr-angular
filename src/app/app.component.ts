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
  constructor(private _flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      console.log(
        "Oh, hi there. My name is Mauricio González. I'm using the amazing Flowbite components library:",
        flowbite
      );
    });
  }
}
