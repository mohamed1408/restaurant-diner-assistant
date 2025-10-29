import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem, Order, QuantityEvent } from '../../utils/types';
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
    console.log('removeItem called', productId, cart_item);
    if (cart_item) {
      console.log('removing item', productId);
      this.menuservice.emitQuantityChange({ productId, quantity: 0 });
    }
  }
  placeOrder() {
    let orders: Order[] = localStorage.getItem('orders.pending') ? JSON.parse(localStorage.getItem('orders.pending') || '[]') : [];
    const kotno = localStorage.getItem('kotno') ? parseInt(localStorage.getItem('kotno') || '1') : 1;
    const newOrder = new Order();
    newOrder.CartItems = this.cartItems;
    newOrder.TableId = '';
    const customer = localStorage.getItem('login.customer') ? JSON.parse(localStorage.getItem('login.customer') || '{}') : { name: '', phonenumber: '' };
    newOrder.CustomerName = customer.name;
    newOrder.CustomerPhoneNumber = customer.phonenumber;
    newOrder.OrderedDate = new Date();
    newOrder.OrderStatus = 0;
    newOrder.KOTNumber = kotno.toString().padStart(4, '0');
    orders.push(newOrder);
    localStorage.setItem('orders.pending', JSON.stringify(orders));
    localStorage.setItem('kotno', (kotno + 1).toString());
    console.log('Cart Items', this.cartItems);
    this.clearCart();
  }
  clearCart() {
    this.menuservice.emitQuantityChange({ productId: 0, quantity: 0 });
  }
}
