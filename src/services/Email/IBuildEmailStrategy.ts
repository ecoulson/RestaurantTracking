import IEmailMessage from "./IEmailMessage";

export default interface IBuildEmailStrategy {
    build() : Promise<IEmailMessage>
}