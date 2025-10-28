import { Injectable, signal } from '@angular/core';
import { QuantityEvent } from '../../utils/types';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  quantityEvt = signal<QuantityEvent | null>(null);
  constructor() { }

  emitQuantityChange(event: QuantityEvent) {
    this.quantityEvt.set(event);
  }
}
