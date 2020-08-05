import IProductPricesController from "./IProductPricesController";
import { Request, Response } from "express";
import IGetProductPricesService from "../../services/ProductPrices/IGetProductPricesService";
import JSONResponse from "../../lib/HTTP/JSONResponse";
import AppType from "../../models/App/AppType";

export default class ProductPricesController implements IProductPricesController {
    private getProductPricesService : IGetProductPricesService

    constructor(getProductPricesService : IGetProductPricesService) {
        this.getProductPricesService = getProductPricesService;
    }

    handleGetProductPrices() {
        return async (request : Request, response : Response) => {
            return new JSONResponse(response).send(
                await this.getProductPricesService.getProductPrices(
                    AppType[request.params.type as keyof typeof AppType]
                )
            )
        }
    }
}