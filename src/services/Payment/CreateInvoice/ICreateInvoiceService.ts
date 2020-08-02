export default interface ICreateInvoiceService {
    createInvoice(customerId : string, cartItems: any) : Promise<void>
}
