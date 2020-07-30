import {
    Stripe,
    StripeElements
} from "@stripe/stripe-js"

export default interface IPurchaseContactsLogPageProps {
    showSuccess: (message: string, delay: number) => void;
    stripe: Stripe | null,
    elements: StripeElements | null,
}