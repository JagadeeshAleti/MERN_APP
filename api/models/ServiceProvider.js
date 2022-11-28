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
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    phoneNo: {
        type: Number
    },
    status: {
        type: String,
        default: "waitng for approval"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema)