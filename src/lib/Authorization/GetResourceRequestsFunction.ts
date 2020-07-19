import { Request } from "express";
import IResourceRequest from "./IResourceRequest";

type GetResourceRequestsFunction = (req : Request) => Promise<IResourceRequest[]>; 

export default GetResourceRequestsFunction;