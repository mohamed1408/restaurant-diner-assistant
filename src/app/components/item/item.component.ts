import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { AddButtonComponent } from '../add-button/add-button.component';
import { Product, QuantityEvent } from '../../utils/types';
import { MenuService } from '../../services/Menu/menu.service';

@Component({
  selector: 'menu-item',
  imports: [AddButtonComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input() product: Product = new Product();
  quantity: number = 0;
  constructor(private menuservice: MenuService) {
    // console.log(this.product);
    effect(() => {
      const quantityEvt = this.menuservice.quantityEvt();
      if (quantityEvt && quantityEvt.productId === this.product.Id) {
        this.quantity = quantityEvt.quantity;
      }
    })
  }
  handleQuantityChange(event: QuantityEvent) {
    event.productId = this.product.Id;
    this.menuservice.emitQuantityChange(event);
  }
}
