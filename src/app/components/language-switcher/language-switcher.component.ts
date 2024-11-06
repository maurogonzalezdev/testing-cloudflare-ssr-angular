import { Component, Output } from '@angular/core';
import { Locale } from '../../interfaces/locale.interface';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ExchangeIconComponent } from '../exchange-icon/exchange-icon.component';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, ExchangeIconComponent],
  templateUrl: './language-switcher.component.html',
  styles: ``,
})
export class LanguageSwitcherComponent {
  private _dropdownIsExpanded: boolean = false;

  @Output()
  public exportStyle?: 'dark' | 'light';

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

  constructor(
    private _translateService: TranslateService,
    private _themeSwitcherService: ThemeSwitcherService
  ) {
    this._themeSwitcherService.getLogoStyle().subscribe((data) => {
      this.exportStyle = data;
    });
  }

  public changeLanguage(locale: 'es' | 'en'): void {
    this._translateService.use(locale);
  }

  get getDropdownStatus(): boolean {
    return this._dropdownIsExpanded;
  }

  public changeDropdownStatus(): void {
    this._dropdownIsExpanded = !this._dropdownIsExpanded;
    return;
  }

  public exchangeIconEnter(): void {
    const changeLanguageIcon = document.getElementById('exchange-icon')
      ?.lastChild as HTMLElement;
    changeLanguageIcon.setAttribute('fill', 'red');
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
