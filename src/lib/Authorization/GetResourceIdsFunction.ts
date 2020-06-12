import { Request } from "express";

type GetResourceIdsFunction = (req : Request) => string[]; 

export default GetResourceIdsFunction;