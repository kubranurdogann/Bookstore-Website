const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:String,
    email: String,
    password: String,
    cart: [
    {
      kitapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kitap", 
      },
      adet: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);