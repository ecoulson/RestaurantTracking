import AppActivationHandler from "../../../../src/services/Stripe/AppActivationHandler"
import AppBroker from "../../../../src/brokers/AppBroker"
import StripeEvents from "../../../../src/services/Webhooks/StripeEvents"
import { generateObjectId } from "../../../helpers/mongo"
import AppGenerator from "../../../mocks/Generators/AppGenerator"

const appGenerator = new AppGenerator()

describe("App Activation Handler", () => {
    describe("Invoice Paid Event", () => {
        test("No app associated with subscription id", async () => {
            const subscriptionId = generateObjectId();
            AppBroker.prototype.findBySubscriptionId =
                jest.fn().mockResolvedValue(null);
            const service = new AppActivationHandler(new AppBroker());

            try {
                await service.handleEvent(StripeEvents.InvoicePaid, {
                    id: generateObjectId(),
                    api_version: "",
                    created: 0,
                    livemode: false,
                    pending_webhooks: 1,
                    type: "",
                    data: {
                        object: {
                            subscription: subscriptionId
                        }
                    },
                    request: {
                        id: generateObjectId(),
                        idempotency_key: generateObjectId()
                    },
                    object: "event"
                })
            } catch(error) {
                expect(error).toEqual(
                    new Error(`No app associated with subscription ${subscriptionId}`)
                )
            }
        })

        test("Activated application", async () => {
            const app = appGenerator.generate();
            AppBroker.prototype.findBySubscriptionId = 
                jest.fn().mockResolvedValue(app);
            AppBroker.prototype.save = jest.fn()
            const service = new AppActivationHandler(new AppBroker())

            await service.handleEvent(StripeEvents.InvoicePaid, {
                id: generateObjectId(),
                api_version: "",
                created: 0,
                livemode: false,
                pending_webhooks: 1,
                type: "",
                data: {
                    object: {
                        subscription: ""
                    }
                },
                request: {
                    id: generateObjectId(),
                    idempotency_key: generateObjectId()
                },
                object: "event"
            })

            expect(app.isActive).toBeTruthy();
            expect(AppBroker.prototype.save).toHaveBeenCalledTimes(1)
        })

        test("App already activated", async () => {
            appGenerator.setActive();
            const app = appGenerator.generate();
            AppBroker.prototype.findBySubscriptionId = 
                jest.fn().mockResolvedValue(app);
                AppBroker.prototype.save = jest.fn()
            const service = new AppActivationHandler(new AppBroker())

            await service.handleEvent(
                StripeEvents.InvoicePaid, 
                {
                    id: generateObjectId(),
                    api_version: "",
                    created: 0,
                    livemode: false,
                    pending_webhooks: 1,
                    type: "",
                    data: {
                        object: {
                            subscription: {
                                id: ""
                            }
                        }
                    },
                    request: {
                        id: generateObjectId(),
                        idempotency_key: generateObjectId()
                    },
                    object: "event"
                }
            )

            expect(app.isActive).toBeTruthy();
            expect(AppBroker.prototype.save).toHaveBeenCalledTimes(0)
        })
    })

    describe("Invoice Payment Failed Event", () => {
        test("No app associated with subscription id", async () => {
            const subscriptionId = generateObjectId();
            AppBroker.prototype.findBySubscriptionId =
                jest.fn().mockResolvedValue(null);
            const service = new AppActivationHandler(new AppBroker());

            try {
                await service.handleEvent(StripeEvents.InvoicePaymentFailed, {
                    id: generateObjectId(),
                    api_version: "",
                    created: 0,
                    livemode: false,
                    pending_webhooks: 1,
                    type: "",
                    data: {
                        object: {
                            subscription: subscriptionId
                        }
                    },
                    request: {
                        id: generateObjectId(),
                        idempotency_key: generateObjectId()
                    },
                    object: "event"
                })
            } catch(error) {
                expect(error).toEqual(
                    new Error(`No app associated with subscription ${subscriptionId}`)
                )
            }
        })

        test("Inactivated application", async () => {
            appGenerator.setActive();
            const app = appGenerator.generate();
            AppBroker.prototype.findBySubscriptionId = 
                jest.fn().mockResolvedValue(app);
            AppBroker.prototype.save = jest.fn()
            const service = new AppActivationHandler(new AppBroker())

            await service.handleEvent(StripeEvents.InvoicePaymentFailed, {
                id: generateObjectId(),
                api_version: "",
                created: 0,
                livemode: false,
                pending_webhooks: 1,
                type: "",
                data: {
                    object: {
                        subscription: ""
                    }
                },
                request: {
                    id: generateObjectId(),
                    idempotency_key: generateObjectId()
                },
                object: "event"
            })

            expect(app.isActive).toBeFalsy();
            expect(AppBroker.prototype.save).toHaveBeenCalledTimes(1)
        })

        test("App already inactivated", async () => {
            const app = appGenerator.generate();
            AppBroker.prototype.findBySubscriptionId = 
                jest.fn().mockResolvedValue(app);
                AppBroker.prototype.save = jest.fn()
            const service = new AppActivationHandler(new AppBroker())

            await service.handleEvent(
                StripeEvents.InvoicePaymentFailed, 
                {
                    id: generateObjectId(),
                    api_version: "",
                    created: 0,
                    livemode: false,
                    pending_webhooks: 1,
                    type: "",
                    data: {
                        object: {
                            subscription: {
                                id: ""
                            }
                        }
                    },
                    request: {
                        id: generateObjectId(),
                        idempotency_key: generateObjectId()
                    },
                    object: "event"
                }
            )

            expect(app.isActive).toBeFalsy();
            expect(AppBroker.prototype.save).toHaveBeenCalledTimes(0)
        })
    })
})