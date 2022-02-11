const { Schema, model } = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

// reaction field's subDoc schema in Thought Model
const ReactionSchema = new Schema(
  {
    //set custom ID to avoid confustion with parent id (ie comment _id)
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  // {
  //   toJSON: { // Tells Schema to use Virtuals & getters
  //     //getters: true
  //   },
  // }
);



const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You must have a thought!.',
      minLength: 1,
      maxLength: 280
    },

    createdAt: {
      type: Date,
      default: Date.now,
      //get: (createdAtVal) => dateFormat(createdAtVal)
    },

    username: {
      type: String,
      required: true
    },

    reactions: [ReactionSchema],// use ReactionSchema to validate for a reaction; replies are nested *directly* in thoughts not referenced
  },
  {
    toJSON: {
      virtuals: true,
      //getters: true
    },
    id: false
  }
);

//-----------------  Virtuals  -----------------
// Get total number of Friends and Replies on Retrieval
// thoughtSchema.virtual('reactionCount').get(function () {
//   let reactionCount = thought.reactions.length;
//   //let reactionCount = reactions.length;
//   return reactionCount;
// });

// -------------- Create Thought Model --------------
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought