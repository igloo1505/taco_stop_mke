const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next(new Error("failed to encrypt password"));
  }
});

UserSchema.methods.comparePassword = async function (password, next) {
  const comparison = bcrypt.compare(password, this.password);
  if (!comparison) {
    return {
      isMatch: false,
      comparison: comparison,
    };
  } else {
    return {
      isMatch: true,
      comparison: comparison,
    };
  }
};

module.exports = mongoose.model("User", UserSchema);
