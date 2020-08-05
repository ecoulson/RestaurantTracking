import { ProductType, AppType } from "../../Store/Cart/types";

export default interface IProduct {
    id: string,
    object: string,
    active: boolean,
    attributes: string[],
    created: number,
    description: string,
    images: string[],
    livemode: false,
    metadata: {
        AppType: AppType
        ProductType: ProductType
    },
    name: string,
    statement_descriptor: string | null,
    type: string,
    unit_label: string,
    updated: number
}