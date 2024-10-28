import { afterRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FlowbiteService } from './services/flowbite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  constructor(private _flowbiteService: FlowbiteService) {
    afterRender(() => {
      setTimeout(() => {
        document.querySelector('#loader')?.classList.add('invisible');
      }, 500);
      console.log('Flowbite loaded');
    });
  }

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      console.log(
        "Oh, hi there. My name is Mauricio González. I'm using the amazing Flowbite components library:",
        flowbite
      );
    });
  }
}
