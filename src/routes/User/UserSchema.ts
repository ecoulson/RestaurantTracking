import Joi from "@hapi/joi";

const RegistrationBodySchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().allow("")
});

const TokenCallbackSchema = Joi.object({
    email: Joi.string().email(),
    token: Joi.string().hex()
})

const TokenBodySchema = Joi.object({
    email: Joi.string().email()
});

const PasswordResetSchema = Joi.object({
    email: Joi.string().email(),
    token: Joi.string().hex(),
    password: Joi.string()
});

const UsernameCheckSchema = Joi.object({
    username: Joi.string().required()
})

const URLProfilePictureSchema = Joi.object({
    link: Joi.string().required()
});

const ProfilePictureSchema = Joi.object({
    userId: Joi.string().hex()
})

const UpdatedProfileSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email(),
    firstName: Joi.string().required(),
    lastName: Joi.string()
});

const PasswordUpdateSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

export {
    RegistrationBodySchema,
    TokenCallbackSchema,
    TokenBodySchema,
    PasswordResetSchema,
    UsernameCheckSchema,
    URLProfilePictureSchema,
    ProfilePictureSchema,
    UpdatedProfileSchema,
    PasswordUpdateSchema
};