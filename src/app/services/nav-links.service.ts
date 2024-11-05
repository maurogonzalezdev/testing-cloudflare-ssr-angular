import { Injectable, OnInit } from '@angular/core';

import { NavLink } from '../interfaces/nav-link.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NavLinksService implements OnInit{
  private _navLinks: NavLink[] = [];

  constructor(private _translateService: TranslateService) {
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
  ngOnInit(): void {
    this._changeUrlLocale()
  }

  get getNavLinks(): NavLink[] {
    return this._navLinks;
  }

  private _changeUrlLocale(): void{
    this._translateService.stream("NAVBAR.HOME").subscribe(data => {
      console.log(data);
    })
  }
}
