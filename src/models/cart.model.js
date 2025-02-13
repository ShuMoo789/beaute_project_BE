const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
       quantity:  {
            type: Number,
            default: 0,
       },
       price: {
            type: Number,
            default: 0,
       },
       customerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
       }
    },
    {
       versionKey: false,
    }
);

module.exports = mongoose.model("Cart", cartSchema);