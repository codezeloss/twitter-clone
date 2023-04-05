const { Schema, default: mongoose, model, models } = require("mongoose");

const LikeSchema = new Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Like = models?.Like || model("Like", LikeSchema);

export default Like;
