import Joi from "@hapi/joi";

const PaymentBodySchema = Joi.object({
    cart: Joi.array().items(
        Joi.object({
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            id: Joi.string().required(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            productImage: Joi.string().required()
        })
    ).required()
})

const CreateCustomerBodySchema = Joi.object({
    billingEmail: Joi.string().required().email(),
    organizationId: Joi.string().required()
})

const CreateSubscriptionSchema = Joi.object({
    paymentMethodId: Joi.string().required(),
    customerId: Joi.string().required(),
    priceIds: Joi.array().items(Joi.string()).required()
});

const GetSetupIntentSchema = Joi.object({
    setupIntentId: Joi.string().required()
})

const UpdatePaymentMethodSchema = Joi.object({
    paymentMethodId: Joi.string().required(),
    customerId: Joi.string().required(),
});

const CancelSubscriptionSchema = Joi.object({
    subscriptionId: Joi.string().required(),
});

export {
    PaymentBodySchema,
    CreateCustomerBodySchema,
    CreateSubscriptionSchema,
    CancelSubscriptionSchema,
    GetSetupIntentSchema,
    UpdatePaymentMethodSchema
};