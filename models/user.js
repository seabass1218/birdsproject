const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  registerDate: {type: Date, default: Date.now,required: true},
  role: {type: String, required: true},
});

const User = mongoose.model('User', userSchema);

module.exports = User;