import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  private _activeColor: string = '';
  private _secondaryColor: string = '';

  @Input()
  set setActiveStyle(style: 'dark' | 'light') {
    if (style === 'dark') {
      this._activeColor = '#ffffff';
      this._secondaryColor = '#f7f7f7';
      return;
    } else if (style === 'light') {
      this._activeColor = '#2d2d2f';
      this._secondaryColor = '#555559';
      return;
    } else {
      return;
    }
  }

  get getActiveColor(): string {
    return this._activeColor;
  }
  get getSecondaryColor(): string {
    return this._secondaryColor;
  }
}
