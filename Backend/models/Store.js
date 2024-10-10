const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  id: String,
  storeName: String,
  location: String,
  ownerName: String,
  contactEmail: String,
  contactNumber: String,
  about: String,
  coverImage: String,
  userId: String,
  storeType: String,
  image: String,
});

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
