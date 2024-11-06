import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Locale } from '../../interfaces/locale.interface';
import { TranslateService } from '@ngx-translate/core';
import {
  CommonModule,
  isPlatformBrowser,
  NgOptimizedImage,
} from '@angular/common';
import { ExchangeIconComponent } from '../exchange-icon/exchange-icon.component';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';
import { NavLink } from '../../interfaces/nav-link.interface';
import { Observable } from 'rxjs';

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

  @Output()
  public emitNavLinksOnClick: EventEmitter<NavLink[]> = new EventEmitter<
    NavLink[]
  >();

  public activeLocale: Locale = {
    flag: '',
    name: '',
    value: '',
  };

  constructor(
    private _translateService: TranslateService,
    private _themeSwitcherService: ThemeSwitcherService,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {
    this._themeSwitcherService.getLogoStyle().subscribe((data) => {
      this.exportStyle = data;
    });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      let locale: string = sessionStorage.getItem('locale') ?? 'en';
      if (locale === 'es') {
        this._translateService.setDefaultLang('es');
        this.activeLocale = {
          flag: '/images/flags/spain-flag.webp',
          name: 'Español',
          value: 'es',
        };
        this._removeLoaderSpinner(80);
      } else {
        sessionStorage.setItem('locale', 'en');
        this.activeLocale = {
          flag: '/images/flags/usa-flag.webp',
          name: 'English',
          value: 'en',
        };
        this._removeLoaderSpinner(80);
      }
    }
  }

  public changeLanguage(): void {


    if (this.activeLocale.value === 'en') {

      this._translateService.use('es');
      this._translateService.get('CORE.NAVBAR').subscribe((data) => {
        this.emitNavLinksOnClick.emit([...data]);
      });
      sessionStorage.setItem('locale', 'es');

      this.activeLocale = {
        flag: '/images/flags/spain-flag.webp',
        name: 'Español',
        value: 'es',
      };
    } else {
      this._translateService.use('en');
      this._translateService.get('CORE.NAVBAR').subscribe((data) => {
        this.emitNavLinksOnClick.emit([...data]);
      });
      sessionStorage.setItem('locale', 'en');

      this.activeLocale = {
        flag: '/images/flags/usa-flag.webp',
        name: 'English',
        value: 'en',
      };
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

  private _removeLoaderSpinner(time: number): void {
    setTimeout(() => {
      document.querySelector('#loader')?.remove();
    }, time);
  }
}
