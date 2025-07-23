import { useEffect, useState,useContext } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { UserContext } from "./context/UserContext";

function Books() {
  const [kitaplar, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userId, setUserId] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:3000/api/kitaplar")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Veri alınamadı:", err));

      const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    setUserId(user._id);
  }

  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = kitaplar.filter((kitap) => {
  const lowerSearch = searchTerm.toLowerCase();
  
  const matchesSearch =
    kitap.kitapAdi.toLowerCase().includes(lowerSearch) ||
    kitap.yazarAdi.toLowerCase().includes(lowerSearch);

const matchesCategory =
  selectedCategory === "" || kitap.tür.includes(selectedCategory);

  return matchesSearch && matchesCategory;
});

const sepeteEkle = async (kitapId) => {
  console.log(userId);
  if (!userId) {
    alert("Lütfen önce giriş yapın.");
    return;
  }
  try {
    const res = await fetch("http://localhost:3000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, kitapId, adet: 1 }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Kitap sepete eklendi.");
       setUser(data.user);
       localStorage.setItem("user", JSON.stringify(data.user));
      console.log("kitap id: "+kitapId);
    } else {
      alert("Hata: " + data.error);
    }
  } catch (error) {
    console.error("Sepete ekleme hatası:", error);
  }
};
  return (
    <>
      <Navbar />
      <div className="books paddingx pt-3">
        <div className="container">
          <h2 className="fw-light">Books</h2>
          <h5 className="text-secondary fw-light mb-4">
            Showing {filteredBooks.length} results
          </h5>
          <div className="row">
            <div className="col-3">
              <div className="categories">
                <h5>Kategoriler</h5>
                <div class="line mb-3"></div>
                <ul>
                  {[
                    "",
                    "Çok Satanlar",
                    "Eğitici Kitaplar",
                    "Kişisel Gelişim",
                  ].map((kategori) => (
                    <li
                      key={kategori}
                      style={{
                        cursor: "pointer",
                        fontWeight:
                          selectedCategory === kategori ? "bold" : "normal",
                      }}
                      onClick={() => setSelectedCategory(kategori)}
                    >
                      {kategori === "" ? "Tüm Kitaplar" : kategori}
                      
                    </li>
                  ))}
                </ul>
              </div>
              <div className="search-library mt-5 mb-5">
                <h5>Search The Library</h5>
                <div className="line"></div>
                <input
                  type="search"
                  className="search-field mt-3"
                  placeholder="Search products…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button">Search</button>
              </div>
            </div>
            <div className="col-9">
              <div className="books-list">
                <div className="row">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((kitap) => (
                      <div className="col-4">
                        <ul>
                          <li>
                            
                              <div className="product-item">
                                <div className="product-image">
                                  <img
                                    src={kitap.imgUrl}
                                    className="d-block w-100"
                                    alt="..."
                                  />
                                <button class="add-to-cart" onClick={() => sepeteEkle(kitap._id)}>Sepete Ekle</button>

                                </div>
                                <div className="product-info">
                                  <h5 clasName="header mt-3"> {kitap.kitapAdi} </h5>
                                  <p className="text-secondary">
                                    {" "}
                                    {kitap.yazarAdi}{" "}
                                  </p>
                                  <span> {kitap.fiyat} ₺</span>

                                </div>
                              </div>
                          </li>
                        </ul>
                      </div>
                    ))
                  ) : (
                    <li>Hiç kitap yok.</li>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Books;
