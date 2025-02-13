const mongoose = require("mongoose")

const voucherSchema = new mongoose.Schema(
    {
        voucherName: {
            type: String,
            required: true,
        },
        voucherType: {
            type: String,
            enum: ["percent", "money"],
            required: true,
        },
        discountValue: {
            type: String,
        },  
        startDate: {
            type: Date,
        },  
        duration: {
            type: Number,
        },  
        expiryDateRule: {
            type: String,
        }, 
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = mongoose.model("Voucher", voucherSchema);