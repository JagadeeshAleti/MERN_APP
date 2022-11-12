const mongoose = require('mongoose')
const { required } = require('../validation-schema/register-validation-schema')

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
    approved: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema)