import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ItemComponent } from '../item/item.component';
import { Category, Catalogoue, Product, QuantityEvent, CartItem } from '../../utils/types';

@Component({
  selector: 'app-menu',
  imports: [ItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnChanges {
  @Input() catalogue: Catalogoue = new Catalogoue();
  @Input() cartItems: CartItem[] = [];
  categories: Category[] = [];

  constructor(private auth: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['catalogue']) {
      this.getCatatLogue();
    }
    if (changes['cartItems']) {
      console.log('Cart Items changed:');
    }
  }

  getCatatLogue() {
    this.catalogue.parent_categories.forEach(parentCat => {
      var parentCat = new Category(parentCat);
      var childCategories: Category[] = this.catalogue.categories.filter(cat => cat.ParentCategoryId === parentCat.Id).map(cat => new Category(cat));
      childCategories.forEach(childCat => {
        childCat.Products = this.catalogue.products.filter(prod => prod.CategoryId === childCat.Id).map(prod => new Product(prod));
      })
      parentCat.Childcategories = childCategories;
      this.categories.push(new Category(parentCat));
    });
  }
  setQuantity() {
    
  }
}
