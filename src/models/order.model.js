const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true, 
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Completed"],
            default: "Pending",
        },
        orderDate: { 
            type: Date, 
            default: Date.now 
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
        }
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model("Order", orderSchema);