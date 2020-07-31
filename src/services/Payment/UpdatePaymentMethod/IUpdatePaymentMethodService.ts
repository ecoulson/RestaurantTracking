export default interface IUpdatePaymentMethodService {
    updatePaymentMethod(customerId: string, paymentMethodId: string) : Promise<void>;
}