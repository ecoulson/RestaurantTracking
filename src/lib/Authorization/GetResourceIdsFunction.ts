import { Request } from "express";
import IResourceRequest from "./IResourceRequest";

type GetResourcesFunction = (req : Request) => IResourceRequest[]; 

export default GetResourcesFunction;