import sgMail from "@sendgrid/mail";

export default class VerificationEmail {
    async send(verificationLink : string) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'evan.m.coulson@gmail.com',
            from: 'evan.m.coulson@gmail.com',
            subject: 'Verification',
            text: 'Verification email',
            html: `<a href=${verificationLink}>Verify Account</a>`,
        };
        try {
            return await sgMail.send(msg);
        } catch (error) {
            throw error;
        }
    }
}