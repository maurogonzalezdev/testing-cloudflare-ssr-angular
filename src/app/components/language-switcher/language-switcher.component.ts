import { Component, OnInit, Output } from '@angular/core';
import { Locale } from '../../interfaces/locale.interface';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ExchangeIconComponent } from '../exchange-icon/exchange-icon.component';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, ExchangeIconComponent, NgOptimizedImage],
  templateUrl: './language-switcher.component.html',
  styles: ``,
})
export class LanguageSwitcherComponent implements OnInit {
  @Output()
  public exportStyle?: 'dark' | 'light';

  public activeLocale: Locale = {
    flag: '',
    name: '',
    value: '',
  };

  constructor(
    private _translateService: TranslateService,
    private _themeSwitcherService: ThemeSwitcherService
  ) {
    this._themeSwitcherService.getLogoStyle().subscribe((data) => {
      this.exportStyle = data;
    });
  }
  ngOnInit(): void {
    if (this._translateService.getDefaultLang() === 'en') {
      this.activeLocale = {
        flag: '/images/flags/usa-flag.webp',
        name: 'English',
        value: 'en',
      };
    } else {
      this.activeLocale = {
        flag: '/images/flags/spain-flag.webp',
        name: 'Español',
        value: 'es',
      };
    }
  }

  public changeLanguage(): void {
    if (this._translateService.getDefaultLang() === 'en') {
      this._translateService.setDefaultLang('es');
      setTimeout(() => {
        this.activeLocale = {
          flag: '/images/flags/spain-flag.webp',
          name: 'Español',
          value: 'es',
        };
      }, 50);
    } else {
      this._translateService.setDefaultLang('en');
      setTimeout(() => {
        this.activeLocale = {
          flag: '/images/flags/usa-flag.webp',
          name: 'English',
          value: 'en',
        };
      }, 50);
    }
  }

  public exchangeIconEnter(): void {
    const changeLanguageIcon = document.getElementById('exchange-icon')
      ?.lastChild as HTMLElement;
    changeLanguageIcon.setAttribute('fill', '#8FB6FF');
  }

  public exchangeIconLeave(): void {
    const changeLanguageIcon = document.getElementById('exchange-icon')
      ?.lastChild as HTMLElement;
    if (this.exportStyle === 'dark') {
      changeLanguageIcon.setAttribute('fill', '#ffffff');
    } else {
      changeLanguageIcon.setAttribute('fill', '#2d2d2f');
    }
  }
}
