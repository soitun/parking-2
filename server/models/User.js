const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// Create a new collection called "users". If this collection already
// exists, Mongoose will not overwrite it, it will just use it
// to load the userSchema.
mongoose.model("users", userSchema);
