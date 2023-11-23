//building schema
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  fund:{
    type: Number,
    required: true,
  },
  pending_orders_fund_book:{
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
        expires: 60*60*24*7,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
    // const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY); //const anmol
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY); //const anmol
    this.tokens = this.tokens.concat({ token: token }); //token:anmol
    await this.save();
    return token;
};
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
