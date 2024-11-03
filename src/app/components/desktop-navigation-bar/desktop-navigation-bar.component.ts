import { Component } from '@angular/core';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import { CommonModule } from '@angular/common';
import { NavLinksService } from '../../services/nav-links.service';
import { NavLink } from '../../interfaces/nav-link.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-desktop-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './desktop-navigation-bar.component.html',
  styles: ``,
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
