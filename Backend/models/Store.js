const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  shopUrl: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  company: {
    type: String,
  },
  taxId: {
    type: String,
  },
  logo: {
    type: String,
  },
  squareLogo: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  socialMediaLinks: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    pinterest: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
