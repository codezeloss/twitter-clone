const { Schema, model, models, default: mongoose } = require("mongoose");

const PostSchema = new Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = models?.Post || model("Post", PostSchema);

export default Post;
