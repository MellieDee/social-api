const { Schema, model } = require('mongoose');
// let validator = require('validator');

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
      // lowercase: true,
      // validate: (value) => {
      //   return validator.isEmail(value)
      // }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, //Foreign Key saying FK is Thought ID
        ref: 'Thought' //thoughts from Thought 
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,//Foreign Key saying FK is User ID
        ref: 'User'
      }
    ]

  },
  {
    toJSON: {
      virtuals: true,
      //getters: true
    },
    id: false // virtual doesn't need an ID
  }
);

// //-----------------  Virtuals  -----------------

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// UserSchema.virtual('repliesCount').get(function () {
//   return this.replies.length;
// });


// -------------- Create User Model --------------
const User = model('User', UserSchema);

module.exports = User