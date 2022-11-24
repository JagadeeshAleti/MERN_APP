const mongoose = require('mongoose')

const serviceProviderSchema = new mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    status: {
        type: String,
        default: "waitng for approval"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    phoneNo: {
        type: Number
    }
})

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema)