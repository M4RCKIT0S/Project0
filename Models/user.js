const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    max: 24,
  },
  name: {
    type: String,
    required: true,
    max: 24,
  },
  surname: {
    type: String,
    required: false,
    max: 24,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authorizedLists:{
      type:[mongoose.SchemaTypes.ObjectId] ,
      ref:'shoppingList',
      required: false,
      default:[],
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('User', userSchema);