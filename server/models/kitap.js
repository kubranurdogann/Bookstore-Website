const mongoose = require('mongoose');

const kitapSchema = new mongoose.Schema({
  kitapAdi: String,
  yazarAdi: String,
  tür: Array,
  fiyat: String,
  imgUrl: String,
  aciklama: String,
});

const Kitap = mongoose.model('Kitap', kitapSchema, 'kitaplar');

module.exports = Kitap;