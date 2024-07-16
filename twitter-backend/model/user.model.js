import mongoose from "mongoose";

const userShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    allmytweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet",
      },
    ],
  },
  { timestamps: true }
);

export const user = mongoose.model("user", userShcema);
