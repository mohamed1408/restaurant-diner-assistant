import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem, QuantityEvent } from '../../utils/types';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MenuService } from '../../services/Menu/menu.service';

@Component({
  selector: 'mini-cart',
  imports: [],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden', opacity: 1 })),
      state('expanded', style({ height: '*', overflow: 'hidden', opacity: 1 })), // * = auto
      transition('collapsed <=> expanded', [
        animate('300ms ease')
      ]),
    ])
  ]
})
export class MiniCartComponent implements OnChanges {
  @Input() cartItems: CartItem[] = [];
  itemCount: number = 0;
  totalPrice: number = 0;
  isExpanded: boolean = false;
  constructor(private menuservice: MenuService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartItems']) {
      this.itemCount = this.cartItems.reduce((count, item) => count + item.quantity, 0);
      this.totalPrice = this.cartItems.reduce((total, item) => total + (item.product.BasePrice * item.quantity), 0);
      if (this.itemCount <= 0) {
        this.isExpanded = false;
      }
    }
  }
  decrease(productId: number) {
    var cart_item = this.cartItems.find(item => item.product.Id === productId);
    if (cart_item && cart_item.quantity > 0) {
      cart_item.quantity--;
      this.menuservice.emitQuantityChange({ productId, quantity: cart_item.quantity });
    }
  }
  increase(productId: number) {
    var cart_item = this.cartItems.find(item => item.product.Id === productId);
    if (cart_item) {
      cart_item.quantity++;
      this.menuservice.emitQuantityChange({ productId, quantity: cart_item.quantity });
    }
  }
  removeItem(productId: number) {
    var cart_item = this.cartItems.find(item => item.product.Id === productId);
    if (cart_item) {
      this.menuservice.emitQuantityChange({ productId, quantity: 0 });
    }
  }
}
