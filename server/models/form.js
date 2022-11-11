const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// set imgUrl true in production
const formSchema = new Schema(
  {
    category: {
      type: String,
      enum: [
        "Commercial",
        "R&D Institute",
        "Research Student (Internal/External)",
        "Internal UG/PG students",
      ],
      required: true,
    },
    unit: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imgUrl: {
      type: String,
      required: false,
    },
    uniqueId: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      email: {
        type: String,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
      },
    },
    sourceOfFunding: {
      type: String,
      required: false,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectObjective: {
      type: String,
      required: true,
    },
    ideaOfProject: {
      origin: {
        type: String,
        required: true,
      },
      methodology: {
        type: String,
        required: true,
      },
      outcome: {
        type: String,
        required: true,
      },
    },
    timeOfCompletion: {
      type: String,
      required: true,
    },
    mentor: {
      type: String,
      required: false,
    },
    member: [
      {
        name: {
          type: String,
          required: true,
        },
        imgUrl: {
          type: String,
          required: false,
        },
        uniqueId: {
          type: String,
          required: true,
        },
        institute: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        mobile: {
          type: Number,
          required: true,
        },
        gender: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      default: "Pending",
    },
    comments: [{
      type: String 
    }]
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

module.exports = mongoose.model("Form", formSchema);
