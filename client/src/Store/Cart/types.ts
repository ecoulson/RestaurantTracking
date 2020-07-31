import BillingCycleType from "../../Pages/PurchasePage/PurchaseContactLogsPage/ContactLogSetup/BillingCycleSetup/BillingCycleType";

export interface ICart {
    items: ICartItem[],
    isCheckingOut: boolean;
}

export enum PaymentType {
    Payment,
    Subscription
}

export interface ICartItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    productImage: string;
    type: PaymentType;
    billingPlan?: BillingCycleType;
}

export enum CartActions {
    ADD = "Add",
    REMOVE = "Remove",
    UPDATE = "Update",
    CHECKOUT_MODE = "CheckoutMode",
    SHOP_MODE = "ShopMode"
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

export type CartActionTypes = IAddToCartAction | 
                                IRemoveFromCartAction | 
                                IUpdateItemInCartAction | 
                                ICheckoutModeAction | 
                                IShopModeAction