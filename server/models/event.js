const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },

  questions: {
    type: String,
    required: true,
  },
  applicants: [
    {
      // userid, response
      userId: Schema.Types.ObjectId,
      response: String,
      time: {
        type: Date,
        default: Date.now(),
      },
      status: {
        type: String,
        default: 'pending'
      }
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
