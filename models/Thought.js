const { Schema, model } = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

// ------ REACTION -------- subDoc schema in Thought 
const ReactionSchema = new Schema(
  { //set custom ID to avoid confusion with parent id (ie comment _id)
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
  {
    toJSON: { // Tells Schema to use Virtuals & getters
      //getters: true
    },
  }
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
// Get Count of Reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// -------------- Create Thought Model --------------
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought