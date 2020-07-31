import Stripe from "stripe";

export default interface IGetSetupIntentService {
    getSetupIntent(setupIntentId: string) : Promise<Stripe.SetupIntent>;
}