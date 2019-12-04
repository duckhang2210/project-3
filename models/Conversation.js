const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Conversation = mongoose.model(
  'conversation',
  ConversationSchema
);
