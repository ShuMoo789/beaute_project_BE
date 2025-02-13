const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema(
    {
        imgResult: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        point: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        
    }
)

module.exports = mongoose.model("Result", resultSchema);