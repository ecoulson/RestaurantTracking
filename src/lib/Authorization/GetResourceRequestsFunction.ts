import { Request } from "express";
import IResourceRequest from "./IResourceRequest";

type GetResourceRequestsFunction = (req : Request) => IResourceRequest[]; 

export default GetResourceRequestsFunction;