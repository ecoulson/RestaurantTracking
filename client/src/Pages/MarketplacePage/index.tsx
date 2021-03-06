import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import MarketPlaceItem from "./MarketPlaceItem";
import IconType from "../../Components/Icon/IconTypes";

export default class MarketplacePage extends React.Component {
    render() {
        return (
            <DashboardLayout title="Marketplace">
                <MarketPlaceItem 
                    icon={IconType.ClipboardList} 
                    desc=""
                    learnMore="/learn-more/check-ins" 
                    purchase="/purchase/check-ins"
                    name="College/University Contact Logs" />
            </DashboardLayout>
        )
    }
}