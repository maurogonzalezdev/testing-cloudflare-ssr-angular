import { isPlatformBrowser } from '@angular/common';
import { Injectable, OnInit, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService implements OnInit {

  constructor(@Inject(PLATFORM_ID) private _platformId: any) {
    console.log('service');
  }

  ngOnInit(): void {
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
        this.removeLoaderSpinner(240);
      } else {
        themeToggleDarkIcon!.classList.remove('hidden');
        this.removeLoaderSpinner(240);

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

  public removeLoaderSpinner(time: number): void {
    setTimeout(() => {
      document.querySelector('#loader')?.classList.add('invisible');
    }, time);
  }
}
