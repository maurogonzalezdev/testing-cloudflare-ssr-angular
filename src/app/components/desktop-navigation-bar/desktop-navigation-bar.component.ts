import { Component, Output } from '@angular/core';

import { NavLink } from '../../interfaces/nav-link.interface';
import { NavLinksService } from '../../services/nav-links.service';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import {
  Router,
  RouterLink,
  RouterLinkWithHref,
  RouterModule,
} from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-desktop-navigation-bar',
  standalone: true,
  templateUrl: './desktop-navigation-bar.component.html',
  imports: [RouterLink, RouterLinkWithHref, RouterModule, LogoComponent],
  styles: `.color-secondary{fill: red}`,
})
export class DesktopNavigationBarComponent {
  private _navLinks: NavLink[] = [];
  public isDark?: boolean;

  @Output()
  public exportStyle?: 'dark' | 'light';

  constructor(
    private _themeSwitcherService: ThemeSwitcherService,
    private _navLinksService: NavLinksService,
    private _router: Router,
    private _scroller: ViewportScroller
  ) {
    this._themeSwitcherService.getLogoStyle().subscribe((data) => {
      this.exportStyle = data;
    });
  }

  ngOnInit(): void {
    this._themeSwitcherService.initThemeService();
    this._navLinks = this._navLinksService.getNavLinks;
  }

  get getNavLinks(): NavLink[] {
    return this._navLinks;
  }

  public navigateToAnchor(anchor: string): void {
    this._router.navigate(['/']).then(() => {
      this._scroller.scrollToAnchor(anchor);
    });
  }
}
