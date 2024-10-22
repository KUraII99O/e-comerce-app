const mongoose = require('mongoose');

// Define Cart schema
const cartSchema = new mongoose.Schema({
  id: { type: String,  }, // Unique cart ID
  userId: { type: String,  }, // User ID
  items: [
    {
      productId: { type: String,  },
      name: { type: String,  },
      price: { type: String,  },
      quantity: { type: String,  }
    }
  ],
  status: { type: Boolean, default: true } // Cart status
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
