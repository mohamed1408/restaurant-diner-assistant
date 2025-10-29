export class Product {
    Id: number = 0;
    Name: string = '';
    BasePrice: number = 0;
    UPPrice: number = 0;
    ImgUrl?: string;
    ProductCode?: string;
    ProductTypeId: number = 0; // Assuming ProductType is an enum or type
    BarCode?: string;
    IsActive: boolean = false;
    IsOnline: boolean = false;
    IsRecomended: boolean = false;
    CreatedDate: Date = new Date();
    ModifiedDate: Date = new Date();
    CGSTPercentage: number = 0;
    SGSTPercentage: number = 0;
    IGSTPercentage: number = 0;
    private _FoodPrepTime: number = 0;
    CategoryId: number = 0;
    Category?: Category;
    StoreId?: number;
    KOTGroupId?: number;
    TaxGroupId: number = 0;
    PreparationTime: string = '';
    Quantity: number = 0;
    constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
}

export class Category {
    Id: number = 0;
    ParentCategoryId?: number;
    Name: string = '';
    Products: Product[] = [];
    Childcategories: Category[] = [];

    constructor(init?: Partial<Category>) {
        Object.assign(this, init);
    }
}
export class Catalogoue {
    parent_categories: Category[] = [];
    categories: Category[] = [];
    products: Product[] = [];
    constructor(init?: Partial<Catalogoue>) {
        Object.assign(this, init);
    }
}
export class QuantityEvent {
    productId: number = 0;
    quantity: number = 0;
}
export class CartItem {
    product: Product = new Product();
    quantity: number = 0;
}
export class Order {
    CartItems: CartItem[] = [];
    TableId: string = '';
    CustomerName: string = '';
    CustomerPhoneNumber: string = '';
    OrderedDate: Date = new Date();
    OrderStatus: number = 0;
    KOTNumber: string = '';
}