import React from "react";

const InActiveAppPage = React.lazy(() => import("../../Pages/ContactLogPages/InActiveAppPage"));

export default function InActiveRoute() {
    return (
        <InActiveAppPage />
    )
}