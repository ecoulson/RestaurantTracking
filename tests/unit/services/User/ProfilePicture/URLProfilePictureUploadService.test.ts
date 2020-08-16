import Axios from "axios"
import FileSystemBroker from "../../../../../src/brokers/FileSystemBroker";
import AWSStorageBroker from "../../../../../src/brokers/StorageBroker.ts/AWSStorageBroker";
import { S3 } from "aws-sdk";
import URLProfilePictureUploadService from "../../../../../src/services/User/ProfilePicture/URLProfilePictureUploadService";
import UserGenerator from "../../../../mocks/Generators/UserGenerator";
import faker from "faker";
import { Writable } from "stream";
import UserBroker from "../../../../../src/brokers/UserBroker";

const userGenerator = new UserGenerator();

describe("URL Profile Picture Upload Service", () => {
    test("Fails to get image", async () => {
        const url = faker.internet.url();
        Axios.get = jest.fn().mockRejectedValue(new Error(""));
        const service = new URLProfilePictureUploadService(
            new FileSystemBroker(),
            new AWSStorageBroker(new S3()),
            new UserBroker()
        )

        try {
            await service.upload(userGenerator.generate(), url)
        } catch (error) {
            expect(error)
                .toEqual(new Error(`Failed to download image from ${url}`))
        }
        expect.assertions(1);
    })

    test("Incorrect content type", async () => {
        const url = faker.internet.url();
        Axios.get = jest.fn().mockResolvedValue({
            headers: {
                "content-type": "foo"
            }
        })
        const service = new URLProfilePictureUploadService(
            new FileSystemBroker(),
            new AWSStorageBroker(new S3()),
            new UserBroker()
        )

        try {
            await service.upload(userGenerator.generate(), url)
        } catch (error) {
            expect(error)
                .toEqual(new Error(`Not an image`))
        }
        expect.assertions(1);
    })

    test("Unsupported image format", async () => {
        const url = faker.internet.url();
        Axios.get = jest.fn().mockResolvedValue({
            headers: {
                "content-type": `image/heic`
            }
        })
        const service = new URLProfilePictureUploadService(
            new FileSystemBroker(),
            new AWSStorageBroker(new S3()),
            new UserBroker()
        )

        try {
            await service.upload(userGenerator.generate(), url)
        } catch (error) {
            expect(error)
                .toEqual(new Error(`Not an accepted file type`))
        }
        expect.assertions(1);
    })

    test("Error when writing the file", (done) => {
        const url = faker.internet.url() + `/${faker.system.commonFileName("png")}`;
        const stream = new Writable()
        FileSystemBroker.prototype.createWriteStream = 
            jest.fn().mockReturnValue(stream);
        Axios.get = jest.fn().mockResolvedValue({
            headers: {
                "content-type": `image/png`
            },
            data: {
                pipe: jest.fn()
            }
        })
        const service = new URLProfilePictureUploadService(
            new FileSystemBroker(),
            new AWSStorageBroker(new S3()),
            new UserBroker()
        )

        service.upload(userGenerator.generate(), url)
            .catch(error => {
                expect(error)
                  .toEqual(new Error("Failed to write file"))
                done();
            })
        setTimeout(() => {
            stream.emit("error", new Error("Failed to write file"))
        }, 100)
        expect.assertions(1);
    })

    test("Uploads file", (done) => {
        const url = faker.internet.url() + `/${faker.system.commonFileName("png")}`;
        const writeStream = new Writable()
        const readStream = new Writable();
        const awsUrl = faker.internet.url();
        const user = userGenerator.generate();
        FileSystemBroker.prototype.createWriteStream = 
            jest.fn().mockReturnValue(writeStream);
        FileSystemBroker.prototype.createReadStream = 
            jest.fn().mockReturnValue(readStream);
        FileSystemBroker.prototype.deleteFile = jest.fn();
        AWSStorageBroker.prototype.upload = 
            jest.fn().mockResolvedValue(`${awsUrl}/${user.id}.png`);
        UserBroker.prototype.save = jest.fn();
        Axios.get = jest.fn().mockResolvedValue({
            headers: {
                "content-type": `image/png`
            },
            data: {
                pipe: jest.fn()
            }
        })
        const service = new URLProfilePictureUploadService(
            new FileSystemBroker(),
            new AWSStorageBroker(new S3()),
            new UserBroker()
        )

        service.upload(user, url)
            .then(() => {
                expect(user.profilePicture).toEqual(`profile_pictures/${user.id}.png`)
                done()
            }) 
        setTimeout(() => {
            writeStream.emit("finish", faker.system.filePath())
        }, 100)
    })
})