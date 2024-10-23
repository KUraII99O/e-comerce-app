const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  shopUrl: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
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
