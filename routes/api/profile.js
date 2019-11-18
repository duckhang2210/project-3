//any API related to Profile

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// #route   GET api/profile/me
// #for     Get current users profile
// #access  Private (token needed)

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// #route   POST api/profile/me
// #for     Create or upate user profile
// #access  Private (token needed)
router.post('/', auth, async (req, res) => {
  const {
    workout_types,
    location,
    bio,
    youtube,
    facebook,
    twitter,
    instagram
  } = req.body;

  //Build profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (workout_types) {
    profileFields.workout_types = workout_types
      .split(',')
      .map(workout_type => workout_type.trim());
  }
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    //Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// #route   GET api/profile
// #for     Get all profiles
// #access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// #route   GET api/profile/user/:user_id
// #for     Get profile by user ID
// #access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res
        .status(400)
        .json({ message: 'There is no profile for this user' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ message: 'There is no profile for this user' });
    }
    res.status(500).send('Server Error');
  }
});

// #route   DELETE api/profile
// #for     Delete profile, user, posts
// #access  Private
router.delete('/', auth, async (req, res) => {
  try {
    //Delete post

    //Delete profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Delete User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
