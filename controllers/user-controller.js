const { User, Thought } = require('../models');

//Create all of these functions as methods of the userController object. 
// These methods will be used as the callback functions for the Express.js routes Each will take two parameters: req and res.

const userController = {

  //Get ALL Users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  //  Get ONE User by ID
  getUserByID({ params }, res) {
    User.findOne(
      { _id: params.id }
    )
      .populate({
        path: 'thoughts'
      })
      .populate({
        path: 'friends',
      })
      // .select('-__v')
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot find this User' })
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  // Create a NEW User  --destructured cuz just need the body data
  //can handle [] or a single data point (takes[] from objectStore)
  createUser({ body }, res) {
    User.create(body)
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // UPDATE a User by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      {
        new: true
        //runValidators: true
      } //new means will return the updated doc with changes in it
      //runValidators in conjunction with require fields in Schema so when pizza is updated -t ALSO gets checked for rules - of not peaople could add super mega size etc
    )
      //set to true returns new not old doc
      .then(data => {
        if (!data) { //confirming data was rec from Mongo
          res.status(404).json({ message: "Cannot find this User" })
          return;
        }
        res.json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // DELETE a User
  // Destructures params, dont need body cuz not passing data
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(data => {
        if (!data) {
          res.status(404).json({ messge: 'Cannot find that user.' });
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

module.exports = userController;