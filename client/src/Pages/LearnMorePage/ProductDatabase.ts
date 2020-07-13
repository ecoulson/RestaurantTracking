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
    sections: [],
    pricingModel: {
        description: "Explore the cost of bring your restaurant into the next era using our business services.",
        type: PricingModelType.RestaurantRegistration,
        pricingStrategy: new RestaurantPricingStrategy()
    }
});

ProductDatabase.set("contact-logs", {
    productName: "contact-logs",
    name: "Safer-at-school Contact Logs for Colleges and Universities",
    description: "Students enter a contact log with the choice of a simple hover, scan, or link. Our data empowers schools to make smart, data informed decisions.",
    overview: {
        title: "Returning responsibly during COVID-19",
        about: "Safer-at-School Contact Logs help you to track infected individuals, monitor building capacity, and identify choke points and high risk areas. Check-in and check-out displays at entrances and exits improve your ability to quarantine exposed individuals, reduce high density check-ins by identifying busy checkpoints, and to enforce a building capacity.",
        mediaPath: "https://wesley.edu/wp-content/uploads/2020/01/South-1-900x500.jpg"
    },
    features: [
        {
            icon: IconType.QRCode,
            name: "Safety",
            description: "Preventative measures—building capacity and heat maps—prevent the spread of COVID-19 at your institution. "
        },
        {
            icon: IconType.ClipboardList,
            name: "Simplicity",
            description: "Contact logs provide the ability to contact trace and make data-informed quarantine suggestions. "
        },
        {
            icon: IconType.Lock,
            name: "Security",
            description: "Know that your users data is safe and secure as we provide end-to-end encryption during the transfer of data."
        }
    ],
    sections: [
        {
            title: "Touchless check-ins/check-outs",
            mediaURL: "https://bestcellphonespyapps.com/wp-content/uploads/2018/04/shutterstock_269190068.jpg",
            description: "Adapt Solutions offers touch-free check-ins for buildings and rooms. We are committed to working with you to provide quality displays and custom branding. Our displays employ NFC technology for streamlined check-in. Individuals hover over our poster and will be directed to a page indicating that they can enter the building. We also have QRs incorporated on our poster offer an alternative to NFC chip usage and Bit.ly urls that direct individuals to pages manually."
        },
        {
            title: "Simple Authentication",
            mediaURL: "https://securityintelligence.com/wp-content/uploads/2018/10/si-advanced-authentication-feature.jpg",
            description: "As default, individuals are directed to our site and prompted to provide their email address only once. Once logged in, individuals can seamlessly hover, scan, or enter bit.ly links and be directly connected to a success page allowing them to enter buildings. Pins are sent to emails to allow for individuals to log back into our system in the case they become logged out. For added cost, you can integrate your identification system with our contact log. When individuals are logged in to their institutional accounts, they can automatically begin hovering, scanning, and entering bit.ly urls without providing email addresses or receiving recovery pins. "
        }
    ],
    pricingModel: {
        description: "Use our price estimator to calculate your price. Upgrades such as college/university branded QR codes, integration with an identification system, and on-the-go check-in/check-out cards are not included.",
        type: PricingModelType.ContactLog,
        pricingStrategy: new ContactLogPricingStrategy()
    }
});

export default ProductDatabase;