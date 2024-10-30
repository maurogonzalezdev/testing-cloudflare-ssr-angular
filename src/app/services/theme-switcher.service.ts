import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  constructor(@Inject(PLATFORM_ID) private _platformId: any) {}

  public initThemeService(): void {
    if (isPlatformBrowser(this._platformId)) {
      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Change the icons inside the button based on previous settings
      const themeToggleDarkIcon = document.getElementById(
        'theme-toggle-dark-icon'
      );
      const themeToggleLightIcon = document.getElementById(
        'theme-toggle-light-icon'
      );

      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        themeToggleLightIcon!.classList.remove('hidden');
        this._removeLoaderSpinner(260);
      } else {
        themeToggleDarkIcon!.classList.remove('hidden');
        this._removeLoaderSpinner(260);
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
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          }

          // If NOT set via local storage previously
        } else {
          if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
          }
        }
      });
    }
  }

  private _removeLoaderSpinner(time: number): void {
    setTimeout(() => {
      document.querySelector('#loader')?.classList.add('invisible');
    }, time);
  }
}
