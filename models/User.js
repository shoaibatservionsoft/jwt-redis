const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: false
  },

  tagline: {
    type: String,
    required: false
  },
  images: [
    {
      url: {
        type: String,
      },
      timestamps: {
        type: Date,
        default: Date.now
      }
    }
  ],
  phone: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  post_code: {
    type: String,
    required: false
  },
  address1: {
    type: String,
    required: false
  },
  address2: {
    type: String,
    required: false
  },
  dob: {
    type: Date,
    required:false
  },
  views: {
    type: Number,
    default: 0
  },
  locale: {
    type: String,
    default: "en"
  }
  
})


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'NONE'
  },
  hourly_rate: {
    type: Number,
    required: false
  },
  currency: {
    type: String,
    required: false
  },
  interests: {
    type: [
      {
        interestID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Interest',
          required: true
        },
        subinterestID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subinterest',
          required: false
        }
      }
    ]
  },
  conversations: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
      }
    ],
  },
  profile: {
    type: profileSchema,
    required: false
  },
  payments: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
      }
    ],
  },
  contents: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
      }
    ],
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
  },
  swipe_left: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
  },
  swipe_right: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  rents: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent',
        required: true
      }
    ],
  },
  ccs: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreditCard',
        required: true
      }
    ],
  },
  notification_preferences: {
    email: {
      type: Boolean,
      required: false,
      default: false
    },
    app: {
      type: Boolean,
      required: false,
      default: false
    }
    
  },
  theme_preferences: {
		type: String,
		default: 'none'
	},
  notifications: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
        required: true
      }
    ]
  },
  fcm: {
    type: String,
    required: false
  },
  timestamps: {
    type: Date,
    default: Date.now
  },
  registration_type: {
    type: String,
    required: true,
    default: 'EMAIL'
  },
  favorites: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
  },
  otp: {
    type: String,
    required: false
  },
  otp_timestamps: {
    type: Date,
    required: false
  },
  biometric_key: {
    type: String,
    required: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  wallet_address: {
		type: String,
		default: null
	},
  stripe_customer_id: {
    type: String,
    required: false
  },
  is_online: {
    type: Boolean,
    default: true
  }
});

  const User = mongoose.model('User', userSchema);

  module.exports = User;
