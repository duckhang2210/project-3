const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  workouttypes: {
    type: [String],
    required: true
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
