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


  // CREATE a NEW User  --destructured 
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
      //runValidators in conjunction with require fields in Schema so when user is updated ALSO gets checked for rules - if not users could add invalid text
    )
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


  // ADD FRIEND (post?)
  addFriend({ params }, res) {
    // and friend to User
    User.findOneAndUpdate(
      { _id: params.userId }, // where user id = id from route param
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot find that user!' });
          return;
        }
        res.json({ message: 'Friend was added successfully!' })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },



  // DELETE a FRIEND
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot find that thought!' });
          return;
        }
        res.json({ message: 'Friend Delete was successful.' })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


  // DELETE  a USER  & their THOUGHTS
  deleteUser({ params, body }, res) {
    User.findOneAndDelete(
      { _id: params.id }
    )
      .then(data => {
        Thought.deleteMany({ username: data.username })
          .then(data => {
            console.log(data.thoughts)
            if (!data) {
              res.status(404).json({ message: 'Cannot find those Thoughts' });
              return;
            }
            res.json(data)
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })

  }
}







module.exports = userController;












//////////////////  DRAFT CODE /////////////
// // Fist draft - deleting friends?
// .then(
//   User.updateMany(
//     { _id: params.userId },
//     { $pull: { friends: { user_id: params.user_id } } },
//     { new: true }
//   )
//     .then(data => {
//       if (!data) {
//         res.status(404).json({ message: 'Cannot find those friends' });
//         return;
//       }
//       res, json({ message: 'User and friends deleted.' })
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     })
// )