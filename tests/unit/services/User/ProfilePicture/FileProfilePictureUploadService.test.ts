import FileProfilePictureUploadService from "../../../../../src/services/User/ProfilePicture/FileProfilePictureUploadService"
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import{ S3 } from "aws-sdk"
import UserBroker from "../../../../../src/brokers/UserBroker";
import AWSStorageBroker from "../../../../../src/brokers/StorageBroker.ts/AWSStorageBroker";

jest.mock("aws-sdk");

const userGenerator = new UserGenerator();

describe("File Profile Picture Upload Service", () => {
    test("Illegal mime type", async () => {
        const user = userGenerator.generate();
        AWSStorageBroker.prototype.upload =
            jest.fn().mockResolvedValue("https://awsurl/test.png")
        UserBroker.prototype.save = jest.fn().mockImplementation(x => x);
        const service = new FileProfilePictureUploadService(
            new UserBroker(),
            new AWSStorageBroker(new S3())
        );

        try {
            await service.upload(user, {
                mimetype: "audio/mp3",
                fieldname: "avatar",
                originalname: "",
                encoding: "",
                size: 1,
                destination: "",
                filename: "",
                path: "",
                buffer: Buffer.from("", 10),
                stream: {} as any
            })
        } catch (error) {
            expect(error)
                .toEqual(new Error("Your profile picture must be an image"))
        }

        expect.assertions(1);
    })

    test("Upload file successfully", async () => {
        const user = userGenerator.generate();
        AWSStorageBroker.prototype.upload =
            jest.fn().mockResolvedValue(`/${user.id}.png`);
        UserBroker.prototype.save = jest.fn().mockImplementation(x => x);
        const service = new FileProfilePictureUploadService(
            new UserBroker(),
            new AWSStorageBroker(new S3())
        );

        await service.upload(user, {
            mimetype: "image/png",
            fieldname: "avatar",
            originalname: "",
            encoding: "",
            size: 1,
            destination: "",
            filename: "",
            path: "",
            buffer: Buffer.from("", 10),
            stream: {} as any
        })

        expect(user.profilePicture).toEqual(`profile_pictures/${user.id}.png`)
        expect(UserBroker.prototype.save).toHaveBeenCalledWith(user);
    })
})