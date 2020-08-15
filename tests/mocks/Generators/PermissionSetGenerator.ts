import IGenerator from "./IGenerator";
import IPermissionSet from "../../../src/models/PermissionSet/IPermissionSet";
import PermissionSetModel from "../../../src/models/PermissionSet/PermissionSetModel";
import faker from "faker"

export default class PermissionSetGenerator implements IGenerator<IPermissionSet> {
    generate() {
        return new PermissionSetModel({
            name: faker.name.firstName(),
        })
    }
}