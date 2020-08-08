import React from "react"
import IPurchasePageProps from "../../Pages/PurchasePage/IPurchasePageProps"

const PurchasePage = React.lazy(() => import("../../Pages/PurchasePage"));

export default function PurchaseProductRoute(props : IPurchasePageProps) {
    return (
        <PurchasePage {...props} />
    )
}