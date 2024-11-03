import { Component } from '@angular/core';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-desktop-navigation-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desktop-navigation-bar.component.html',
  styles: ``
})
export class DesktopNavigationBarComponent {
  private _isExpanded: boolean = false;

  constructor(private _themeSwitcherService: ThemeSwitcherService) {}

  ngOnInit(): void {

    this._themeSwitcherService.initThemeService();
  }

  get getExpandedStatus(): boolean {
    return this._isExpanded;
  }

  public setExpandedStatus() {
    this._isExpanded = !this._isExpanded;
  }
}
