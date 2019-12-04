const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    body: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  }
);

module.exports = Message = mongoose.model('message', MessageSchema);
