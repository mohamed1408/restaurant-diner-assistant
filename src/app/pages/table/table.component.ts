import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuComponent } from "../../components/menu/menu.component";
import { CartItem, Catalogoue, QuantityEvent } from '../../utils/types';
import { MiniCartComponent } from '../../components/mini-cart/mini-cart.component';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/Menu/menu.service';
import { HeaderComponent } from '../../components/header/header.component';
import { OrderhistoryComponent } from '../../components/orderhistory/orderhistory.component';

@Component({
  selector: 'app-table',
  imports: [MenuComponent, MiniCartComponent, HeaderComponent, OrderhistoryComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  tableId: string | null = null;
  cartItems: CartItem[] = [];
  catalogue: Catalogoue = new Catalogoue();
  loginedInCustomer: { name: string, phonenumber: string } | null = null;
  mode: string = 'orderhistory'; // menu | cart
  constructor(private route: ActivatedRoute, private auth: AuthService, private menuservice: MenuService) {
    this.loginedInCustomer = this.auth.getLoggedInCustomer();
    effect(() => {
      const quantityEvt = this.menuservice.quantityEvt();
      if (quantityEvt) {
        this.handleQuantityChange(quantityEvt);
      }
    })
  }

  ngOnInit(): void {
    this.tableId = this.route.snapshot.paramMap.get('tableId');
    this.getCatatLogue()
  }
  getCatatLogue() {
    this.auth.getMenu().subscribe((data) => {
      this.catalogue = new Catalogoue(data);
    }, (error) => {
      alert('Error fetching menu data: ' + error.message);
    })
  }
  handleQuantityChange(event: QuantityEvent) {
    if (event.productId === 0 && event.quantity === 0) {
      console.log('Clearing cart items');
      this.cartItems = [];
      return;
    }
    if (event.quantity <= 0 && this.cartItems.findIndex(item => item.product.Id === event.productId) !== -1) {
      this.cartItems = this.cartItems.filter(item => item.product.Id !== event.productId);
    } else {
      const existingItemIndex = this.cartItems.findIndex(item => item.product.Id === event.productId);
      if (existingItemIndex !== -1) {
        this.cartItems[existingItemIndex].quantity = event.quantity;
      } else {
        const newCartItem = new CartItem();
        newCartItem.product = this.catalogue.products.find(prod => prod.Id === event.productId) || newCartItem.product;
        newCartItem.quantity = event.quantity;
        this.cartItems.push(newCartItem);
      }
    }
    this.cartItems = [...this.cartItems]; // Trigger change detection
  }
}
