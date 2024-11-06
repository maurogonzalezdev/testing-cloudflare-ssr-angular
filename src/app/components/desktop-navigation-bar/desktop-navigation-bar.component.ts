import { Component, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';

import { NavLink } from '../../interfaces/nav-link.interface';
import { NavLinksService } from '../../services/nav-links.service';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import {
  Router,
  RouterLink,
  RouterLinkWithHref,
  RouterModule,
} from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { Locale } from '../../interfaces/locale.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-desktop-navigation-bar',
  standalone: true,
  templateUrl: './desktop-navigation-bar.component.html',
  imports: [
    RouterLink,
    RouterLinkWithHref,
    RouterModule,
    LogoComponent,
    TranslateModule,
    LanguageSwitcherComponent,
  ],
})
export class DesktopNavigationBarComponent implements OnInit {
  private _navLinks: NavLink[] = [];
  public isDark?: boolean;

  public activeLocale: Locale = {
    flag: '',
    name: '',
    value: '',
  };

  @Output()
  public exportStyle?: 'dark' | 'light';

  constructor(
    private _themeSwitcherService: ThemeSwitcherService,
    private _navLinksService: NavLinksService,
    private _router: Router,
    private _scroller: ViewportScroller,
    private _translateService: TranslateService,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {
    this._themeSwitcherService.getLogoStyle().subscribe((data) => {
      this.exportStyle = data;
    });
  }

  ngOnInit(): void {
    this._themeSwitcherService.initThemeService();


    // this._navLinks = this._navLinksService.getNavLinks;

    if(isPlatformBrowser(this._platformId)){
      let locale: string = sessionStorage.getItem('locale') ?? 'en';
      if(locale === 'es'){
        this._translateService.use('es');
        this.activeLocale = {
          flag: '/images/flags/spain-flag.webp',
          name: 'Español',
          value: 'es',
        };
        this._translateService.get('CORE.NAVBAR').subscribe(
          data =>{
            this._navLinks = [...data]
          }
        );

      }else{
        sessionStorage.setItem('locale', 'en');
        this.activeLocale = {
          flag: '/images/flags/usa-flag.webp',
          name: 'English',
          value: 'en',
        };
        this._translateService.get('CORE.NAVBAR').subscribe(
          data =>{
            this._navLinks = [...data]
          }
        );
      }
  }

}

  get getNavLinks(): NavLink[] {
    return this._navLinks;
  }

  public navigateToAnchor(anchor: string): void {
    this._router.navigate(['/']).then(() => {
      this._scroller.scrollToAnchor(anchor);
    });
  }

  public inputNavLinksOnChange(e: NavLink[]): void{
    this._navLinks = [...e]
  }
}
