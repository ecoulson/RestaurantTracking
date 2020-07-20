import IUserVerificationService from "./IUserVerificationService";
import IVerificationStrategy from "./IVerificationStrategy";

export default class UserVerificationService implements IUserVerificationService {
    async verify(verificationStrategy : IVerificationStrategy) {
        return await verificationStrategy.verify();
    }
}