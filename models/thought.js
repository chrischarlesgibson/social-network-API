const { Schema, model } = require("mongoose");
const reaction = require("./reaction");
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
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactioncount` that gets the amount of reactions for the thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//initialize the thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
