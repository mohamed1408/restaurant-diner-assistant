import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LongPressDirective } from '../../directives/long-press.directive';
import { NgClass } from '@angular/common';
import { QuantityEvent } from '../../utils/types';

@Component({
  selector: 'add-button',
  imports: [LongPressDirective, NgClass],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
  animations: [
    trigger('slideInLeft', [
      state('hidden', style({ transform: 'translateX(-100%)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('200ms ease-in'))
    ]),
    trigger('slideInRight', [
      state('hidden', style({ transform: 'translateX(100%)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('200ms ease-in'))
    ]),
    trigger('countChange', [
      transition(':increment', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('250ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('250ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AddButtonComponent implements OnChanges {
  @Input() quantity: number = 0;
  showHyphen = false;
  showSymbols = false;
  @Output() quantityChanged = new EventEmitter<QuantityEvent>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quantity']) {
      if (this.quantity === 0) this.showHyphen = false;
    }
  }

  toggleHyphen() {
    this.showHyphen = !this.showHyphen;
    this.increment();
  }

  toggleSymbols() {
    this.showSymbols = !this.showSymbols;
  }

  increment() {
    this.quantity++;
    this.quantityChanged.emit({ productId: 0, quantity: this.quantity });
  }

  decrement() {
    if (this.quantity > 0) this.quantity--;
    if (this.quantity === 0) this.showHyphen = false;
    this.quantityChanged.emit({ productId: 0, quantity: this.quantity });
  }
  clearQty() {
    this.quantity = 0;
    this.showHyphen = false;
    this.quantityChanged.emit({ productId: 0, quantity: this.quantity });
  }
}
