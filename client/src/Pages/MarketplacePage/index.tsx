import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import MarketPlaceItem from "./MarketPlaceItem";
import IconType from "../../Components/Icon/IconTypes";

export default class MarketplacePage extends React.Component {
    render() {
        return (
            <DashboardLayout title="Marketplace">
                <MarketPlaceItem 
                    icon={IconType.Shop}
                    desc="By registering your organization with us you can start to customize your organization by purchasing additional addons."
                    to="/learn-more/organization" 
                    name="Organization Setup" />
                <MarketPlaceItem 
                    icon={IconType.ClipboardList} 
                    desc="Provide an optional contact tracing logging service using personalized QR Codes. Works great for bars, coffee shops, and seat your self restaurants."
                    to="/learn-more/contact-logs" 
                    name="Contact Logs" />
            </DashboardLayout>
        )
    }
}