export default class InternalURLBuilder {
    build(internalURL: string) {
        if (process.env.NODE_ENV === "production") {
            return `https://${process.env.HOST_NAME}/${internalURL}`;
        } else {
            return `http://${process.env.HOST_NAME}:${process.env.CLIENT_PORT}/${internalURL}`;
        }
    }
}