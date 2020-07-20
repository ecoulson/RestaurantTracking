import IVerifyUserService from "./IVerifyUserService";
import IVerifyUserStrategy from "./IVerifyUserStrategy";

export default class VerifyUserService implements IVerifyUserService {
    async verify(verifyUserStrategy : IVerifyUserStrategy) {
        return await verifyUserStrategy.verify();
    }
}