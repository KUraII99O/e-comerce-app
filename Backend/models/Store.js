const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({

    id: String,
    storeName: String,
    location: String,
    ownerName: String,
    contactEmail: String,
    contactNumber: String,
    registrationDate: String,
    status: Boolean,
    userId: String,
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;
