const mongoose = require("mongoose");

const CheckInSchema = new mongoose.Schema({
    email: String,
    number: String,
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
    return await this.find({ restaurantId }).exec();
} 

CheckInSchema.methods.serialize = function() {
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