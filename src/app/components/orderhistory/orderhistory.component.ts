import { Component } from '@angular/core';
import { Order } from '../../utils/types';

@Component({
  selector: 'app-orderhistory',
  imports: [],
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.scss'
})
export class OrderhistoryComponent {
  ordersPending: Order[] = [];
  constructor() {
    const ordersData = localStorage.getItem('orders.pending');
    if (ordersData) {
      this.ordersPending = JSON.parse(ordersData);
    }
    console.log('Pending Orders:', this.ordersPending);
  }
}
