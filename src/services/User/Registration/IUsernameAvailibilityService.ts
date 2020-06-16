export default interface IUsernameAvailibilityService {
    check(username: string) : Promise<boolean>;
}