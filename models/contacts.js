const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    cell: {
        type: Number,
        required: true,
        min: 999999999,
        max: 9999999999,
        trim: true
    }
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;