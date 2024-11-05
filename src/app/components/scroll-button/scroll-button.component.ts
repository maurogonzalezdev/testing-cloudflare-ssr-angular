import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  templateUrl: './scroll-button.component.html',
})
export class ScrollButtonComponent {
  private _showScroll?: boolean;
  private _showScrollHeight = 200;
  private _hideScrollHeight = 200;

  constructor(private _router: Router, private _location: Location) {}

  @HostListener('window:scroll', [])
  private _onWindowScroll() {
    if (
      (window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this._showScrollHeight
    ) {
      this._showScroll = true;
    } else if (
      this._showScroll &&
      (window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this._hideScrollHeight
    ) {
      this._showScroll = false;
    }
  }

  public scrollToTop() {
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo(0, 0);
      this._removeHashFromUrl();
    }
  }
  private _removeHashFromUrl(): void {
    let hasHash: boolean = this._router.url.includes('#');
    if (hasHash) {
      this._location.go('/');
      return;
    }

    return;
  }

  get getShowScrollStatus(): boolean {
    return this._showScroll ?? false;
  }
}
