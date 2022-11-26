const { Schema, model, Types } = require("mongoose");
const mongooseDateFormat = require("mongoose-date-format-v2");

// const reaction = require("./reaction");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
reactionSchema.plugin(mongooseDateFormat);
thoughtSchema.plugin(mongooseDateFormat);
// Create a virtual property `reactioncount` that gets the amount of reactions for the thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//initialize the thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
