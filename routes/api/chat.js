const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Message = require('../../models/Message');
const Conversation = require('../../models/Conversation');
const User = require('../../models/User');

// @route    GET api/chat/
// @desc     Get all conversations
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user.id })
      .select('_id')
      .sort({ date: -1 });

    let fullConversations = [];
    conversations.map(function(conversation) {
      Message.find({ conversationId: conversation._id })
        .sort('-createdAt')
        .limit(1)
        .populate('user', ['name', 'avatar'])
        .exec(function(err, message) {
          if (err) {
            res.send({ error: err });
          }
          fullConversations.push(message[0]);
          if (fullConversations.length === conversations.length) {
            return res.status(200).json(fullConversations);
          }
        });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/chat/:conversationId
// @desc     Get a specific conversation and its messages
// @access   Private
router.get('/:conversationId', auth, async (req, res) => {
  try {
    await Message.find({ conversationId: req.params.conversationId })
      .sort('-createdAt')
      .populate('user', ['name', 'avatar'])
      .exec(function(err, messages) {
        if (err) {
          res.send({ error: err });
        }

        res.status(200).json(messages);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/chat/new/:receiverID
// @desc     Send a message to :receiverID
// @access   Private
router.post(
  '/new/:id',
  [
    auth,
    [
      check('body', 'please say something')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.params.id) {
      return res
        .status(422)
        .send({ error: 'Please choose a valid recipient for your message.' });
    }

    try {
      const newConversation = new Conversation({
        participants: [req.user.id, req.params.id]
      });
      const conversation = await newConversation.save();

      const user = await User.findById(req.user.id).select('-password');

      const newMessage = new Message({
        conversationId: conversation._id,
        body: req.body.body,
        author: req.user._id,
        avatar: user.avatar,
        name: user.name
      });

      const message = await newMessage.save();

      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/chat/:conversationID
// @desc     Reply a message from :conversationID
// @access   Private
router.post(
  '/:conversationId',
  [
    auth,
    [
      check('body', 'please say something')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.params.conversationId) {
      return res
        .status(422)
        .send({ error: 'This conversation is not existed' });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newReply = new Message({
        conversationId: req.params.conversationId,
        body: req.body.body,
        author: req.user._id,
        avatar: user.avatar,
        name: user.name
      });

      const reply = await newReply.save();
      res.json(reply);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
