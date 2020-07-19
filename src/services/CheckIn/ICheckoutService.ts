export default interface ICheckoutService {
    checkout(checkoutId: string) : Promise<void>
}