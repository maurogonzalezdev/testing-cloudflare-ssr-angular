import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private _logoStyle$: Subject<'dark' | 'light'> = new Subject<'dark' | 'light'>();

  constructor(@Inject(PLATFORM_ID) private _platformId: any) {}

  public initThemeService(): void {
    if (isPlatformBrowser(this._platformId)) {
      // On page load or when changing themes to avoid FOUC
      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        this._nextLogoStyle('dark');
        document.documentElement.classList.add('dark');
      } else {
        this._nextLogoStyle('light');
        document.documentElement.classList.remove('dark');
      }
      // TODO: El servicio se esta instanciando cada vez que hay un window resize -> moverlo a un componente padre
      console.log('init');

      // Change the icons inside the button based on previous settings
      const themeToggleDarkIcon = document.getElementById(
        'theme-toggle-dark-icon'
      );
      const themeToggleLightIcon = document.getElementById(
        'theme-toggle-light-icon'
      );

      // Logo selector
      const siteLogo: HTMLImageElement = document.getElementById(
        'site-logo'
      ) as HTMLImageElement;

      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        this._nextLogoStyle('dark');
        themeToggleLightIcon!.classList.remove('hidden');
      } else {
        this._nextLogoStyle('light');
        themeToggleDarkIcon!.classList.remove('hidden');
      }

      const themeToggleBtn = document.getElementById('theme-toggle');

      themeToggleBtn!.addEventListener('click', () => {
        // Toggle icons inside button
        themeToggleDarkIcon!.classList.toggle('hidden');
        themeToggleLightIcon!.classList.toggle('hidden');

        // If set via local storage previously
        if (localStorage.getItem('color-theme')) {
          if (localStorage.getItem('color-theme') === 'light') {
            this._nextLogoStyle('dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
          } else {
            this._nextLogoStyle('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          }

          // If NOT set via local storage previously
        } else {
          if (document.documentElement.classList.contains('dark')) {
            this._nextLogoStyle('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          } else {
            this._nextLogoStyle('dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
          }
        }
      });
    }
  }

  private _setLogoStyle(
    logoRef: HTMLImageElement,
    style: 'dark' | 'light'
  ): void {
    if (style === 'dark') {
      console.log(logoRef);
      return;
    } else {
      //logoRef.setAttribute('ngSrc', '/logo-light.svg');
      return;
    }
  }

  private _nextLogoStyle(style: 'dark' | 'light'): void {
    if(!style){
      return
    }

    this._logoStyle$.next(style);
  }

  public getLogoStyle(): Observable<'dark' | 'light'> {
    return this._logoStyle$.asObservable();
  }
}
