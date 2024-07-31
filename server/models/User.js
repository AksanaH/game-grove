const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const gameSchema = require("./Games");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },

    savedGames: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("gameCount").get(function () {
  return this.savedGames.length;
});

const User = model("User", userSchema);

module.exports = User;
