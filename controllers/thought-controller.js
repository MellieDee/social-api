const res = require('express/lib/response');
const { Thought, User } = require('../models');
const userController = require('./user-controller');

//Create all of these functions as methods of the userController object. 
// These methods will be used as the callback functions for the Express.js routes Each will take two parameters: req and res.

const thoughtController = {

  // CREATE a NEW Thought
  createThought({ body }, res) {
    const user_id = body.user_id
    console.log(user_id + ' line 13')

    Thought.create(body)

      .then(data => {
        // console.log(data);
        User.findOneAndUpdate(
          { _id: body.user_id },// where the id = user id
          { $push: { thoughts: data._id } },//id of the thought from data promise - then push this thought Id into the users thought[]
          { new: true }
        )
          .then(userData => {
            if (!userData) {
              res.status(404).json({ message: 'Cannot find that user!' })
              return;
            }
            console.log(userData);
            res.json(userData)
            //when all is done  body is created, and its moved infor into user, then we return the final res
          })
          .catch(err => res.json(err));
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // Get ALL thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.statust(400).json(err)
      })
  },


  // Get ONE Thought
  getThoughtById({ params }, res) {
    Thought.findOne(
      { _id: params.id }
    )
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      // .select('- __v')
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot find that Thought!' })
          return;
        }
        res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // UPDATE a Thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      {
        new: true
      }
    )
      // .select('- __v')
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot find that Thought!' })
          return;
        }
        res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // DELETE a Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.id }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot find that Thought!' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }

}




module.exports = thoughtController