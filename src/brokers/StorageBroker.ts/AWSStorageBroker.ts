import IStorageBroker from "./IStorageBroker";
import { S3 } from "aws-sdk"
import IAWSStorageItem from "./IAWSStorageItemt";

export default class AWSStorageBroker implements IStorageBroker {
    private bucket : S3;

    constructor(bucket : S3) {
        this.bucket = bucket;
    }

    async upload(params : IAWSStorageItem) {
        return new Promise(
            (resolve : (value : string) => void, reject : (error : Error) => void) => {
                this.bucket.upload({
                    Bucket: params.Bucket,
                    Key: params.Key,
                    Body: params.Body
                }, (err, data) => {
                    if (err) {
                        return reject(err);
                    }  
                    return resolve(data.Location);
                })
            }
        )
    }
}