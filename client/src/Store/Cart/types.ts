export interface ICart {
    items: ICartItem[],
    isCheckingOut: boolean;
}

export enum ProductType {
    Physical = "Physical",
    App = "App"
}

export enum AppType {
    ContactLogs = "ContactLogs"
}

export interface ICartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    productImage: string;
    productType: ProductType;
    appType: AppType;
    billingPlan?: string;
    prices: {
        priceId: string,
        quantity: number
    }[];
    onClick?: (item: ICartItem) => void;
    onDelete?: (item: ICartItem) => void;
    onUpdate?: (item: ICartItem) => void;
}

export enum CartActions {
    ADD = "Add",
    REMOVE = "Remove",
    UPDATE = "Update",
    CHECKOUT_MODE = "CheckoutMode",
    SHOP_MODE = "ShopMode",
    CLEAR_CART = "ClearCart"
}

export interface IAddToCartAction {
    type: CartActions.ADD;
    cartItem: ICartItem;
}

export interface IRemoveFromCartAction {
    type: CartActions.REMOVE;
    id: string;
}

export interface IUpdateItemInCartAction {
    type: CartActions.UPDATE;
    id: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    productImage?: string;
}

export interface ICheckoutModeAction {
    type: CartActions.CHECKOUT_MODE
}

export interface IShopModeAction {
    type: CartActions.SHOP_MODE
}

export interface IClearCartAction {
    type: CartActions.CLEAR_CART
}

export type CartActionTypes = IAddToCartAction | 
                                IRemoveFromCartAction | 
                                IUpdateItemInCartAction | 
                                ICheckoutModeAction | 
                                IShopModeAction |
                                IClearCartAction;