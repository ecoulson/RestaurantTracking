import RestaurantModel from "../models/restaurant/RestaurantModel";
import URLShortner from "../lib/URL-shortener";
import { logger } from "../lib/logging";
import IRestaurantRegistration from "../controllers/Restaurant/IRestaurantRegistration";

export default class RestaurantService {
    async registerRestaurant(restaurantRegistration : IRestaurantRegistration) : Promise<void> {
        logger.info(`Registering ${restaurantRegistration.name} as a restaurant`);
        await this.saveRestaurantToDB(restaurantRegistration);
        logger.info(`Registered ${restaurantRegistration.name} as a restaurant`);
    }
    
    private async saveRestaurantToDB(restaurantRegistration : IRestaurantRegistration) {
        logger.debug(`Saving a restaurant by the name ${restaurantRegistration.name} to the database`);
        const restaurant = new RestaurantModel({
            name: restaurantRegistration.name,
            number: restaurantRegistration.number,
            url: ""
        });
        restaurant.url = (await URLShortner(restaurant._id)).data.link;
        try {
            await restaurant.save();
        } catch (error) {
            throw new Error(`Failed to save restaurant ${restaurantRegistration.name} to database`);
        }
        logger.debug(`Saved a restaurant with the name ${restaurantRegistration.name} to the database`)
    }

    async generateQRCode(restaurantId : string) {
        logger.info(`Generating a QR Code for restaurant with id ${restaurantId}`);
        const restaurant = await this.findRestaurant(restaurantId);
        if (!restaurant) {
            logger.error(`Failed to generate a QR Code for restaurant with id ${restaurantId} because it does not exsist`);
            throw new Error(`Failed to find a restaurant with id ${restaurantId}`);
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
            throw new Error(`Failed to find a restaurant with id ${restaurantId}`);
        }
    }

    async getRestaurant(restaurantId : string) {
        logger.info(`Finding restaurant with the id ${restaurantId}`);
        const restaurant = await this.findRestaurant(restaurantId);
        if (restaurant) {
            logger.info(`Found restaurant with the id ${restaurantId}`);
            return restaurant
        } else {
            logger.info(`No restaurant with the id ${restaurantId}`);
            throw new Error(`No restaurant with the id ${restaurantId}`);
        }
    }

    async getAllRestaurants() {
        try {
            return await RestaurantModel.find();
        } catch (error) {
            throw new Error("Failed to find all restaurants");
        }
    }
}