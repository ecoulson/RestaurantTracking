import React from "react"
import LearnMoreLayout from "../../Layouts/LearnMoreLayout";
import IPriceEstimatorPageProps from "./IPriceEstimatorPageProps";
import PricingModelType from "../LearnMorePage/PricingSection/Model/PricingModelType";
import ProductDatabase from "../LearnMorePage/ProductDatabase";
import IProductData from "../LearnMorePage/IProductData";
import OrganizationPricing from "../LearnMorePage/PricingSection/OrganizationPricing";
import ContactLogPricing from "../LearnMorePage/PricingSection/ContactLogPricing";
import PageLayout from "../../Layouts/PageLayout";
import NavPanel from "../../Layouts/Components/NavPanel";
import Cookie from "../../lib/Cookie";
import LearnMoreContainer from "../../Layouts/LearnMoreLayout/LearnMoreContainer";
import TopSection from "../LearnMorePage/TopSection";
import LearnMoreSection from "../LearnMorePage/LearnMoreSection";
import Button from "../../Components/Button";
import AppHistory from "../../AppHistory";

export default class PriceEstimatorPage extends React.Component<IPriceEstimatorPageProps> {
    render() {
        const productData = ProductDatabase.get(this.props.match.params.product) as IProductData;
        return (
            <PageLayout pageTitle="Price Calculator">
                <div style={{display: "flex"}}>
                    {this.getNavPanel()}
                    <LearnMoreContainer title="Price Calculator">
                        <div className="learn-more-section-container">
                            <TopSection
                                name={productData.name} 
                                description={productData.description} 
                                productName={productData.productName} />
                            <LearnMoreSection>
                                {this.getPricingComponent()}
                                <Button onClick={() => AppHistory.push(`/learn-more/${productData.productName}`)}>Back</Button>
                            </LearnMoreSection>
                        </div>
                    </LearnMoreContainer>
                </div>
            </PageLayout>
        )
    }

    private getNavPanel() {
        return Cookie.getCookie("token") !== null ? 
            <NavPanel /> :
            null
    }

    private getPricingComponent() {
        const productData = ProductDatabase.get(this.props.match.params.product) as IProductData;
        switch (productData.pricingModel.type) {
            case PricingModelType.OrganizationRegistration:
                return <OrganizationPricing {...productData.pricingModel} />
            case PricingModelType.ContactLog:
                return <ContactLogPricing {...productData.pricingModel} />
            default:
                return null;
        }
    }
}