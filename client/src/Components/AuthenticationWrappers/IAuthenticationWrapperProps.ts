export default interface IAuthenticationWrapperProps {
    showError(message: string, time: number): void;
    to: string;
    unverified?: boolean;
}