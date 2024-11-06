import { Injectable } from '@angular/core';

import { NavLink } from '../interfaces/nav-link.interface';

@Injectable({
  providedIn: 'root',
})
export class NavLinksService {
  private _navLinks: NavLink[] = [];

  constructor() {
    this._navLinks = [
      {
        title: 'home',
        url: '/',
      },
      {
        title: 'about',
        url: '#about',
      },
      {
        title: 'skills',
        url: '#skills',
      },
      {
        title: 'projects',
        url: '#projects',
      },
      {
        title: 'contact',
        url: '#contact',
      },
      {
        title: 'blog',
        url: '/blog',
      },
    ];
  }

  get getNavLinks(): NavLink[] {
    return this._navLinks;
  }
}
