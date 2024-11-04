import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  constructor(@Inject(PLATFORM_ID) private _platformId: any) {}

  public initThemeService(): void {
    if (isPlatformBrowser(this._platformId)) {
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
        themeToggleLightIcon!.classList.remove('hidden');
        this._setLogoStyle(siteLogo, 'dark');
      } else {
        themeToggleDarkIcon!.classList.remove('hidden');
        this._setLogoStyle(siteLogo, 'light');
      }

      const themeToggleBtn = document.getElementById('theme-toggle');

      themeToggleBtn!.addEventListener('click', () => {
        // Toggle icons inside button
        themeToggleDarkIcon!.classList.toggle('hidden');
        themeToggleLightIcon!.classList.toggle('hidden');

        // If set via local storage previously
        if (localStorage.getItem('color-theme')) {
          if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            this._setLogoStyle(siteLogo, 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            this._setLogoStyle(siteLogo, 'light');
          }

          // If NOT set via local storage previously
        } else {
          if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            this._setLogoStyle(siteLogo, 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            this._setLogoStyle(siteLogo, 'dark');
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
      logoRef.src = '/logo-dark.svg';
      return;
    } else {
      logoRef.src = '/logo-light.svg';
      return;
    }
  }
}
