const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Event = require('../models/Event');

// @route     GET api/events
// @desc      Get all users events
// @access    Private
//{user: req.user.id}
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find().sort({
      date: -1,
    });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/events
// @desc      Add new event
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('date', 'Date is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors});
    }

    const {title, date} = req.body;

    try {
      const newContact = new Event({
        title,
        date,
        user: req.user.id,
      });

      const event = await newContact.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/events/:id
// @desc      Update event
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {title,date} = req.body;

  // Build event object
  const contactFields = {};
  if (title) contactFields.title = title;
  if (date) contactFields.date = date;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({msg: 'event not found'});

    // // Make sure user owns event
    // if (event.user.toString() !== req.user.id) {
    //   return res.status(401).json({msg: 'Not authorized'});
    // }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      {$set: contactFields},
      {new: true},
    );

    res.json(event);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/events/:id
// @desc      Delete event
// @access    Private
// req.params.id
router.delete('/:id', auth, async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({msg: 'event not found'});

    // // Make sure user owns event
    // if (event.user.toString() !== req.user.id) {
    //   return res.status(401).json({msg: 'Not authorized'});
    // }

    await Event.findByIdAndRemove(req.params.id);

    res.json({msg: 'Event removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;