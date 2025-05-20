import mongoose from "mongoose";

const fuelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: {
            lat: {
                type: Number,
                required: true, // Ensure lat is always provided
                min: -90, // Latitude ranges from -90 to 90
                max: 90
            },
            lng: {
                type: Number,
                required: true, // Ensure lng is always provided
                min: -180, // Longitude ranges from -180 to 180
                max: 180
            }
        },
        required: true // Ensure the entire location object is provided
    },
    phone: {
        type: Number,
        required: true,
    },
    isValid: {
        type: Boolean,
        default: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    quantity: {
        petrol: {
            price: { type: Number, required: true }, // Ensure price is required
            quantity: { type: Number, required: true }, // Ensure quantity is required
        },
        diesel: {
            price: { type: Number, required: true }, // Ensure price is required
            quantity: { type: Number, required: true }, // Ensure quantity is required
        },
    },
});

export default mongoose.model("Station", fuelSchema);
