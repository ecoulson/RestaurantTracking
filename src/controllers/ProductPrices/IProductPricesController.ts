import { RequestHandler } from "express";

export default interface IProductPricesController {
    handleGetProductPrices() : RequestHandler;
}