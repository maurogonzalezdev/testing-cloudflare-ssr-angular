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
import { Locale } from '../../interfaces/locale.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-desktop-navigation-bar',
  standalone: true,
  templateUrl: './desktop-navigation-bar.component.html',
  imports: [RouterLink, RouterLinkWithHref, RouterModule, LogoComponent, TranslateModule],
})
export class DesktopNavigationBarComponent {
  private _navLinks: NavLink[] = [];
  public isDark?: boolean;

  public activeLocale: Locale = {
    flag: 'images/flags/spain-flag.webp',
    name: 'español',
    value: 'es',
  };

  public locales: Locale[] = [
    {
      flag: 'images/flags/usa-flag.webp',
      name: 'english',
      value: 'en',
    },
    {
      flag: 'images/flags/spain-flag.webp',
      name: 'español',
      value: 'es',
    },
  ];

  @Output()
  public exportStyle?: 'dark' | 'light';

  constructor(
    private _themeSwitcherService: ThemeSwitcherService,
    private _navLinksService: NavLinksService,
    private _router: Router,
    private _scroller: ViewportScroller,
    private _translateService: TranslateService
  ) {
    this._themeSwitcherService.getLogoStyle().subscribe((data) => {
      this.exportStyle = data;
    });
  }

  ngOnInit(): void {
    this._themeSwitcherService.initThemeService();
    this._navLinks = this._navLinksService.getNavLinks;

    setTimeout(() => {
      this._translateService.use('es')
    }, 900);
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
