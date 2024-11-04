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
        active: true,
        public: true,
      },
      {
        title: 'about',
        url: '#about',
        active: true,
        public: true,
      },
      {
        title: 'skills',
        url: '#skills',
        active: true,
        public: true,
      },
      {
        title: 'projects',
        url: '#projects',
        active: true,
        public: true,
      },
      {
        title: 'contact',
        url: '#contact',
        active: true,
        public: true,
      },
      {
        title: 'blog',
        url: '/blog',
        active: true,
        public: true,
      },
    ];
  }

  get getNavLinks(): NavLink[] {
    return this._navLinks;
  }
}
