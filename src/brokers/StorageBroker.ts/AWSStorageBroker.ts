import IStorageBroker from "./IStorageBroker";
import { S3 } from "aws-sdk"

export default class AWSStorageBroker implements IStorageBroker<S3, S3.PutObjectRequest> {
    async upload(bucket : S3, params : S3.PutObjectRequest) {
        return new Promise(
            (resolve : (value : string) => void, reject : (error : Error) => void) => {
                bucket.upload({
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