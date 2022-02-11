const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required.',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: 'Email is required.',
      //validate: [validateEmail, 'Please fill a valid email address'],
      // match: [/^[A-Z0-9.+-]+[A-Z0-9.+-]+@[A-Z0-9.-]{2,63}\.([a-z]{2,6})$/, 'Please enter a valid email address']
      //match: [/.+@.+\..+/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, //Foreign Key saying FK is Thought iD
        ref: 'Thought' //thoughts from Thought 
      }
    ],
    // friends: [
    //   {
    //     //type: String,
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    //   }
    // ]

  },
  {
    toJSON: {
      //virtuals: true,
      //getters: true
    },
    id: false
  }
);

// //-----------------  Virtuals  -----------------
// //Get total number of Friends and Replies on Retrieval
// UserSchema.virtual('friendCount').get(function () {
//   // let friendCount = user.friends.length;
//   let friendCount = friends.length;
//   return friendCount;
// });

// -------------- Create User Model --------------
const User = model('User', UserSchema);

module.exports = User