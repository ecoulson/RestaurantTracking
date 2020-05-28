const mongoose = require("mongoose");
const { logger } = require("../lib/logging");

const CheckInSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ""
    },
    number: {
        type: String,
        default: ""
    },
    timeCheckedIn: {
        type: Date,
        default: Date.now()
    },
    restaurantId: { 
        type: String,
        required: true
    }
});

CheckInSchema.statics.findByRestaurantId = async function(restaurantId) {
    logger.debug(`Querying restaurant collection for restaurant with id ${restaurantId}`)
    return await this.find({ restaurantId });
} 

CheckInSchema.methods.serialize = function() {
    logger.debug(`Serializing checkin document with id ${this._id}`);
    return {
        __v: this.__v,
        _id: this._id,
        email: this.email,
        number: this.number,
        timeCheckedIn: this.timeCheckedIn,
        restaurantId: this.restaurantId
    }
}

module.exports = mongoose.model("checkin", CheckInSchema);