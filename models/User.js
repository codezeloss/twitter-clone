const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  cover: {
    type: String,
  },
  bio: {
    type: String,
  },
  username: {
    type: String,
  },
});

const User = models?.User || model("User", UserSchema);

export default User;
