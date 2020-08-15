import IStorageItem from "./IStorageItem"
import { S3 } from "aws-sdk";

export default interface IAWSStorageItem extends IStorageItem, S3.PutObjectRequest {
    
}