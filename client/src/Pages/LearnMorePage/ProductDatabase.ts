import IProductData from "./IProductData";
import IconType from "../../Components/Icon/IconTypes";
import PricingModelType from "./PricingSection/Model/PricingModelType";
import RestaurantPricingStrategy from "./PricingSection/RestaurantPricing/RestaurantPricingStrategy";

const ProductDatabase : Map<string, IProductData> = new Map<string, IProductData>();

ProductDatabase.set("restaurant", {
    name: "Restaurant Registration and Setup",
    description: "Take the first steps into bringing your restaurant online by creating your online workspace",
    overview: {
        title: "Manage your restaurant online",
        about: "Registering your restaurant helps you start the process of transitioning your business online. Provide your restaurant's information and then browse the market place to configure your restaurant and see the power of our other solutions.",
        mediaPath: "https://media.architecturaldigest.com/photos/5e5e78b26fb065000842ba95/4:3/w_3200,h_2400,c_limit/Main-Dining-Room-2.jpg"
    },
    features: [
        {
            icon: IconType.Users,
            name: "User Management",
            description: "Add your employees and control the access that they have to data on the system."
        },
        {
            icon: IconType.ClipboardList,
            name: "Restaurant Information",
            description: "Provide your restaurant's basic information for a customized experience"
        },
        {
            icon: IconType.CreditCard,
            name: "Payment Method",
            description: "By adding a credit card to your restaurant you gain access to adding our solutions to your restaurant with the click of a button."
        }
    ],
    pricingModel: {
        description: "Explore the cost of bring your restaurant into the next era using our business services.",
        type: PricingModelType.RestaurantRegistration,
        pricingStrategy: new RestaurantPricingStrategy()
    }
});

export default ProductDatabase;