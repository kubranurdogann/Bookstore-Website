const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const Message = require('./models/form');

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const User = require("./models/user");
const Kitap = require('./models/kitap');

mongoose.connect('mongodb://127.0.0.1:27017/kitaplar')
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('Bağlantı hatası:', err));

const configDB = mongoose.createConnection("mongodb://127.0.0.1:27017/config", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const kitaplarDB = mongoose.createConnection("mongodb://127.0.0.1:27017/kitaplar", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactFormDB = mongoose.createConnection("mongodb://127.0.0.1:27017/contactFormDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Bu e-posta adresi ile kayıtlı bir kullanıcı zaten var." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Kullanıcı kaydedildi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hata oluştu." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("cart.kitapId");

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Hatalı şifre" });
    }

    // Parolayı döndürme!
    const { _id, name, email: userEmail, cart } = user;

    res.status(200).json({
      message: "Giriş başarılı",
      user: {
        _id,
        name,
        email: userEmail,
        cart, 
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});



app.get("/api/kitaplar", async (req, res) => {
  try {
    const kitaplar = await Kitap.find();
    res.json(kitaplar);
  } catch (err) {
    res.status(500).json({ error: "veriler alınmadı" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});


app.post("/api/cart/add", async (req, res) => {
  const { userId, kitapId, adet } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı." });

    const existingItem = user.cart.find(
      (item) => item.kitapId.toString() === kitapId
    );

    if (existingItem) {
      existingItem.adet += adet;
    } else {
      user.cart.push({ kitapId, adet });
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.kitapId");

    res.status(200).json({
      message: "Kitap sepete eklendi.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Sepete ekleme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});


app.delete("/api/cart/remove", async (req, res) => {
  const { userId, kitapId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    user.cart = user.cart.filter(
      (item) => item.kitapId.toString() !== kitapId
    );

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.kitapId");

    res.status(200).json({
      message: "Kitap sepetten silindi.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Silme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});


app.get("/api/kitaplar/cok-satanlar", async (req, res) => {
  try {
    const cokSatanlar = await Kitap.find({ tür: "Çok Satanlar" });
    res.status(200).json(cokSatanlar);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

//contact form 
app.post("/api/messages", async (req, res) => {
  try {
    console.log("Gelen veri:", req.body);
    
    const { email, company, message } = req.body;

    if (!email || !company || !message) {
      return res.status(400).json({ error: "Eksik alanlar var" });
    }

    const newMessage = new Message({ email, company, message });
    await newMessage.save();

    res.status(201).json({ message: "Mesaj başarıyla kaydedildi" });
  } catch (err) {
    console.error("Sunucu hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});
