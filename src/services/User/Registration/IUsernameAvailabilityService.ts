export default interface IUsernameAvailabilityService {
    check(username: string) : Promise<boolean>;
}