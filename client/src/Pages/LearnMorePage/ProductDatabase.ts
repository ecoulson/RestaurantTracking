import IProductData from "./IProductData";
import IconType from "../../Components/Icon/IconTypes";
import PricingModelType from "./PricingSection/Model/PricingModelType";
import OrganizationPricingStrategy from "./PricingSection/OrganizationPricing/OrganizationPricingStrategy";
import ContactLogPricingStrategy from "./PricingSection/ContactLogPricing/ContactLogPricingStrategy";

const ProductDatabase : Map<string, IProductData> = new Map<string, IProductData>();

ProductDatabase.set("organization-setup", {
    productName: "organization-setup",
    name: "Organization Setup",
    description: "Take the first steps into bringing your organization online by creating your online workspace",
    overview: {
        title: "Manage your organization online",
        about: "Registering your organization helps you start the process of transitioning your business online. Provide your organization's information and then browse the market place to configure your organization and see the power of our other solutions.",
        mediaPath: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2301&q=80"
    },
    features: [
        {
            icon: IconType.Users,
            name: "User Management",
            description: "Add your employees and control the access that they have to data on the system."
        },
        {
            icon: IconType.ClipboardList,
            name: "organization Information",
            description: "Provide your organization's basic information for a customized experience"
        },
        {
            icon: IconType.CreditCard,
            name: "Payment Method",
            description: "By adding a credit card to your organization you gain access to adding our solutions to your organization with the click of a button."
        }
    ],
    sections: [],
    pricingModel: {
        description: "Explore the cost of bring your organization into the next era using our business services.",
        type: PricingModelType.OrganizationRegistration,
        pricingStrategy: new OrganizationPricingStrategy()
    }
});

ProductDatabase.set("check-ins", {
    productName: "check-ins",
    name: "Safer-at-School Check Ins for Colleges and Universities",
    description: "Prevention and intervention as a dual safety protection strategy against COVID-19.",
    overview: {
        title: "Returning responsibly during COVID-19",
        about: "Adapt Solutions uses NFC chips, QR codes, and bit.ly links to check in persons as they enter buildings, allowing colleges and universities to enforce a building capacity, monitor high-risk areas, and identify infected students.",
        mediaPath: "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3600&q=80"
    },
    features: [
        {
            icon: IconType.QRCode,
            name: "Safety",
            description: "COVID-19 prevention with building capacity and activity metrics."
        },
        {
            icon: IconType.ClipboardList,
            name: "Simplicity",
            description: "Touchless check-ins/check-outs employing NFC technology."
        },
        {
            icon: IconType.Lock,
            name: "Security",
            description: "Know that your users data is safe and secure as we provide end-to-end encryption during the transfer of data."
        }
    ],
    sections: [
        {
            title: "How it works",
            alt: "image of a phone face down in darkness",
            mediaURL: "https://images.unsplash.com/photo-1526222344609-ca3e80ea3b06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4176&q=80",
            description: "When entering a building, individuals hover, scan, or type a bit.ly link to check in. If a building is under capacity, persons will reach a success page and be instructed to enter the building. If the building is at capacity, students will receive a notice not to enter."

        },
        {
            title: "Smart, data informed decisions",
            alt: "futuristic, transparent panel with blue wires",
            mediaURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
            description: "By analyzing check in and check-out timestamps, we can notify you of your “choke points,” so that you can decrease traffic in high-risk areas. With a simple query, institutions can determine what buildings an infected student has entered. The persons checked-in simultaneously could be encouraged to quarantine for 14 days, and the buildings they entered could be thoroughly sanitized."
        }
    ],
    pricingModel: {
        description: "Use our price estimator to view the options available to your establishment.",
        type: PricingModelType.ContactLog,
        pricingStrategy: new ContactLogPricingStrategy()
    }
});

ProductDatabase.set("contact-logs-business", {
    productName: "contact-logs-business",
    name: "Safer-at-business Contact Logs for Businesses",
    description: "Employees and Customers enter a contact log with the choice of a simple hover, scan, or link. Our data empowers businesses to make smart, data informed decisions.",
    overview: {
        title: "Returning responsibly during COVID-19",
        about: "Safer-at-School Contact Logs help you to track infected individuals, monitor building capacity, and identify choke points and high risk areas. Check-in and check-out displays at entrances and exits improve your ability to quarantine exposed individuals, reduce high density check-ins by identifying busy checkpoints, and to enforce a building capacity.",
        mediaPath: "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3600&q=80"
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
            description: ". "
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
            alt: "image of a phone face down in darkness",
            mediaURL: "https://images.unsplash.com/photo-1526222344609-ca3e80ea3b06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4176&q=80",
            description: "Adapt Solutions offers touch-free check-ins for buildings and rooms. We are committed to working with you to provide quality displays and custom branding. Our displays employ NFC technology for streamlined check-in. Individuals hover over our poster and will be directed to a page indicating that they can enter the building. We also have QRs incorporated on our poster offer an alternative to NFC chip usage and Bit.ly urls that direct individuals to pages manually."
        },
        {
            title: "Simple Authentication",
            alt: "futuristic, transparent panel with blue wires",
            mediaURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3450&q=80",
            description: "As default, individuals are directed to our site and prompted to provide their email address only once. Once logged in, individuals can seamlessly hover, scan, or enter bit.ly links and be directly connected to a success page allowing them to enter buildings. Pins are sent to emails to allow for individuals to log back into our system in the case they become logged out. For added cost, you can integrate your identification system with our contact log. When individuals are logged in to their institutional accounts, they can automatically begin hovering, scanning, and entering bit.ly urls without providing email addresses or receiving recovery pins. "
        }
    ],
    pricingModel: {
        description: "Use our price calculator to view the options available to your establishment.",
        type: PricingModelType.ContactLog,
        pricingStrategy: new ContactLogPricingStrategy()
    }
});

export default ProductDatabase;