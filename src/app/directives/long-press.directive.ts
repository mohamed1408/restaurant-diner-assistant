import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
@Output() longPress = new EventEmitter<MouseEvent>();

  private pressTimer: any;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // fire longPress after 500ms hold
    console.log('mousedown detected');
    this.pressTimer = setTimeout(() => {
      this.longPress.emit(event);
    }, 500);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp() {
    clearTimeout(this.pressTimer);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.pressTimer = setTimeout(() => {
      this.longPress.emit(event as any);
    }, 500);
  }

  @HostListener('touchend')
  onTouchEnd() {
    clearTimeout(this.pressTimer);
  }
}
