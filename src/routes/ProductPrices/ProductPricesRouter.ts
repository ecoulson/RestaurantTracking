import RouterConfiguration from "../RouterConfiguration";
import ValidationMiddleware from "../../middleware/Validation/ValidationMiddleware";
import { GetProductPricesSchema } from "./ProductPricesSchema";
import ErrorCatchingMiddleware from "../../middleware/ErrorHandling/ErrorCatchingMiddleware";
import IProductPricesController from "../../controllers/ProductPrices/IProductPricesController";

export default class ProductPricesRouter extends RouterConfiguration {
    private productPricesController : IProductPricesController;

    constructor(productPricesController : IProductPricesController) {
        super();
        this.productPricesController = productPricesController;
    }

    configureRoutes() {
        this.router.get(
            '/:type',
            new ValidationMiddleware(GetProductPricesSchema).validateParams(),
            ErrorCatchingMiddleware.catchErrors(this.productPricesController.handleGetProductPrices())
        )
    }
}