import { Component } from '@angular/core';

import { NavLink } from '../../interfaces/nav-link.interface';
import { NavLinksService } from '../../services/nav-links.service';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';

@Component({
  selector: 'app-desktop-navigation-bar',
  standalone: true,
  templateUrl: './desktop-navigation-bar.component.html',
})
export class DesktopNavigationBarComponent {
  private _navLinks: NavLink[] = [];

  constructor(
    private _themeSwitcherService: ThemeSwitcherService,
    private _navLinksService: NavLinksService
  ) {}

  ngOnInit(): void {
    this._themeSwitcherService.initThemeService();
    this._navLinks = this._navLinksService.getNavLinks;
  }

  get getNavLinks(): NavLink[] {
    return this._navLinks;
  }
}
