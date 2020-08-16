import { access, mkdir, unlink, createWriteStream, createReadStream } from "fs";

export default class FileSystemBroker {
    async directoryExists(directoryPath : string) : Promise<boolean> {
        return new Promise((resolve) => {
            access(directoryPath, (err) => {
                if (!err) {
                    resolve(true);
                }
                resolve(err && err.code === 'ENONT');
            })
        })
    }

    async makeDirectory(directoryPath : string) : Promise<void> {
        return new Promise((resolve, reject) => {
            mkdir(directoryPath, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        })
    }

    async deleteFile(filePath : string) {
        return new Promise((resolve , reject) => {
            unlink(filePath, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        })
    }

    createWriteStream(path : string) {
        return createWriteStream(path)
    }

    createReadStream(path : string) {
        return createReadStream(path)
    }
}