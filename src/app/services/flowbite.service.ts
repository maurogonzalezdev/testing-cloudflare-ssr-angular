import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlowbiteService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then((flowbite) => {
        callback(flowbite);
      });

      var themeToggleDarkIcon = document.getElementById(
        'theme-toggle-dark-icon'
      );
      var themeToggleLightIcon = document.getElementById(
        'theme-toggle-light-icon'
      );

      // Change the icons inside the button based on previous settings
      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        themeToggleLightIcon!.classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('#loader')?.classList.add('invisible');
        }, 100);
      } else {
        themeToggleDarkIcon!.classList.remove('hidden');
        setTimeout(() => {
          document.querySelector('#loader')?.classList.add('invisible');
        }, 100);
      }

      var themeToggleBtn = document.getElementById('theme-toggle');

      themeToggleBtn!.addEventListener('click', function () {
        // toggle icons inside button
        themeToggleDarkIcon!.classList.toggle('hidden');
        themeToggleLightIcon!.classList.toggle('hidden');

        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
          if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
          }

          // if NOT set via local storage previously
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
}
