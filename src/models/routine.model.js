const mongoose = require("mongoose")

const routineSchema = new mongoose.Schema(
    {
        routineName: {
            type: String,
            required: true,
        },
        routineDescription: {
            type: String,
            required: true,
        },
        stepNumber: {
            type: Number,
            required: true,
        },    
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = mongoose.model("Routine", routineSchema);