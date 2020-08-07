import React from "react";

const HomePage = React.lazy(() => import("../../Pages/HomePage"));

export default function HomeRoute() {
    return (
        <HomePage />
    )
}