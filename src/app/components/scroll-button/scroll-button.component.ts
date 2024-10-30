import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  templateUrl: './scroll-button.component.html',
})
export class ScrollButtonComponent {
  private _showScroll?: boolean;
  private _showScrollHeight = 200;
  private _hideScrollHeight = 200;

  constructor() {}

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
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, 0);
      }
    })();
  }

  get getShowScrollStatus(): boolean {
    return this._showScroll ?? false;
  }
}
