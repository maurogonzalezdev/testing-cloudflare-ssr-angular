import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-icon',
  standalone: true,
  templateUrl: './exchange-icon.component.html',
  styles: ``,
})
export class ExchangeIconComponent {
  private _activeColor: string = '';

  @Input()
  set setActiveStyle(style: 'dark' | 'light') {
    if (style === 'dark') {
      this._activeColor = '#ffffff';
      return;
    } else if (style === 'light') {
      this._activeColor = '#2d2d2f';
      return;
    } else {
      return;
    }
  }

  get getActiveColor(): string {
    return this._activeColor;
  }
}
