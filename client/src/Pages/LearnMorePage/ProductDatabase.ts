import IProductData from "./IProductData";
import IconType from "../../Components/Icon/IconTypes";
import PricingModelType from "./PricingSection/Model/PricingModelType";
import RestaurantPricingStrategy from "./PricingSection/RestaurantPricing/RestaurantPricingStrategy";
import ContactLogPricingStrategy from "./PricingSection/ContactLogPricing/ContactLogPricingStrategy";

const ProductDatabase : Map<string, IProductData> = new Map<string, IProductData>();

ProductDatabase.set("restaurant", {
    productName: "restaurant-registration",
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

ProductDatabase.set("contact-logs", {
    productName: "contact-logs",
    name: "30-Day Contract Tracing Logs",
    description: "Keep voluntary, confidential logs of customers who visit your establishment to help COVID-19 contact tracers.",
    overview: {
        title: "Help track the spread of COVID-19",
        about: "Purchase this add on to create your own stylized QR that patrons of your restaurant can easily scan upon entry to your restaurant. By scanning this QR Code users will be directed to your own check-in log page where users enter either their phone number or email to enter themselves confidentially into the log. We create daily reports that are securely stored and only distributed to official contact tracers. Each report lives for 30 days and then expires. This add on complies with Washington State governor Jay Inslee's May 15th memo regarding restaurant logs.",
        mediaPath: "https://www.flytap.com/-/media/Flytap/fly-tap/lead-images/check-in-automatido-ld.svg"
    },
    features: [
        {
            icon: IconType.QRCode,
            name: "Custom QR Code",
            description: "Create a branded QR Code that attracts visitors attention."
        },
        {
            icon: IconType.ClipboardList,
            name: "30-Day Contact Logs",
            description: "Creates confidential logs that only contact tracers can access."
        },
        {
            icon: IconType.Lock,
            name: "Security",
            description: "Know that your logs are secured in our system and are anonymous."
        }
    ],
    pricingModel: {
        description: "Calculate the setup and maintenance cost of a COVID-19 contact log for your business.",
        type: PricingModelType.ContactLog,
        pricingStrategy: new ContactLogPricingStrategy()
    }
});

export default ProductDatabase;