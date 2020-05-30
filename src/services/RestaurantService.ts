import RestaurantModel from "../models/restaurant/RestaurantModel";
import { Response } from "../lib/HTTP";
import URLShortner from "../lib/URL-shortener";
import { logger } from "../lib/logging";
import IRestaurantRegistration from "../controllers/Restaurant/IRestaurantRegistration";

export default class RestaurantService {
    async registerRestaurant(restaurantRegistration : IRestaurantRegistration) : Promise<boolean> {
        logger.info(`Registering ${restaurantRegistration.name} as a restaurant`);
        await this.saveRestaurantToDB(restaurantRegistration);
        logger.info(`Registered ${restaurantRegistration.name} as a restaurant`);
        return true;
    }
    
    private async saveRestaurantToDB(restaurantRegistration : IRestaurantRegistration) {
        logger.debug(`Saving a restaurant by the name ${restaurantRegistration.name} to the database`);
        const restaurant : any = new RestaurantModel({
            name: restaurantRegistration.name,
            number: restaurantRegistration.number,
            url: ""
        });
        restaurant.url = (await URLShortner(restaurant._id)).data.link 
        await restaurant.save();
        logger.debug(`Saved a restaurant with the name ${restaurantRegistration.name} to the database`)
    }

    async generateQRCode(restaurantId : string) {
        logger.info(`Generating a QR Code for restaurant with id ${restaurantId}`);
        const restaurant = await this.findRestaurant(restaurantId);
        if (!restaurant) {
            logger.error(`Failed to generate a QR Code for restaurant with id ${restaurantId} because it does not exsist`);
            throw new Error(`Failed to find a restaurant with id ${restaurantId}`)
        }
        return restaurant;
    }

    private async findRestaurant(restaurantId : string) {
        logger.debug(`Finding a restaurant with id ${restaurantId}`);
        try {
            const restaurant = await RestaurantModel.findById(restaurantId);
            logger.debug(`Found a restaurant with id ${restaurantId}`);
            return restaurant;
        } catch (error) {
            logger.debug(`Failed to find a restaurant with id ${restaurantId}`);
            return null;
        }
    }

    async getRestaurant(restaurantId : string) {
        logger.info(`Finding restaurant with the id ${restaurantId}`);
        const restaurant = await this.findRestaurant(restaurantId);
        if (restaurant) {
            logger.info(`Found restaurant with the id ${restaurantId}`);
            return restaurant
        } else {
            logger.info(`Failed to find a restaurant with the id ${restaurantId}`);
            throw new Error("Could not find restaurant");
        }
    }
}