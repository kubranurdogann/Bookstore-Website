import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Çıkış Yapıldı.");
    window.location.href = "/";
  };

  const sepettenSil = async (kitapId) => {
    if (!user || !user._id) return;

    try {
      const res = await fetch("http://localhost:3000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id, kitapId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Kitap sepetten silindi.");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        alert("Hata: " + data.error);
      }
    } catch (error) {
      console.error("Sepetten silme hatası:", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container-fluid paddingx">
          <div className="logo pe-5">
            <a href="/">
              <img
                src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/logobookstore.png"
                alt=""
              />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item pe-2">
                <Link className="nav-link fw-light" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item pe-2">
                <Link className="nav-link fw-light" to="/books">
                  Books
                </Link>
              </li>
              <li className="nav-item pe-2">
                <Link className="nav-link fw-light" to="/library">
                  Library
                </Link>
              </li>
              <li className="nav-item pe-2">
                <Link className="nav-link fw-light" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="nav-icon">
              <div id="searchBox" className="search-box hidden">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search..."
                ></input>
              </div>

              <div class="nav-item dropdown">
                <a
                  class="nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="cart-icon">
                    <span
                      id="cart-count"
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >
                      {user?.cart
                        ? new Set(
                            user.cart.map((item) =>
                              typeof item.kitapId === "object"
                                ? item.kitapId._id?.toString()
                                : item.kitapId?.toString()
                            )
                          ).size
                        : 0}
                    </span>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                </a>
                <ul className="dropdown-menu p-3" style={{ minWidth: "300px" }}>
  {user?.cart && user.cart.length > 0 ? (
    <>
      {user.cart.map((item, index) => {
        const kitap = item.kitapId;
        const kitapAdi =
          typeof kitap === "object" ? kitap.kitapAdi : "Kitap bilgisi yok";
        const adet = item.adet;
        const fiyat = item.fiyat;

        return (
          <li
            key={`${
              typeof kitap === "object" ? kitap._id : kitap
            }-${index}`}
            className="mb-2 pb-2"
          >
            <div className="row">
              <div className="col-3">
                <img
                  src={kitap.imgUrl}
                  className="cart-product-img"
                  alt=""
                />
              </div>
              <div className="col-6">
                <span className="cart-product-title">{kitapAdi}</span>
                <br />
                <div>
                  <span className="cart-product-count">Adet: {adet}</span>
                  <span>{fiyat}</span>
                </div>
              </div>
              <div className="col-3 cart-product-icon">
                <div onClick={() => sepettenSil(item.kitapId._id)}>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
          </li>
        );
      })}

      <br />
      <h5>
        Toplam Tutar:{" "}
        {(
          user.cart.reduce((acc, item) => {
            const kitap = item.kitapId;
            const adet = item.adet || 1;
            const fiyat =
              typeof kitap === "object" ? parseFloat(kitap.fiyat) : 0;
            return acc + fiyat * adet;
          }, 0) || 0
        ).toFixed(2)}{" "}
        ₺
      </h5>
      <hr />
      <div className="text-center">
        <button className="submit-button">Sepeti Onayla</button>
      </div>
    </>
  ) : (
    <li>Sepetiniz boş.</li>
  )}
</ul>

              </div>

              <div class="nav-item dropdown">
                <a
                  class="nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user ms-4"></i>
                </a>
                <ul class="dropdown-menu p-3">
                  {user ? (
                    <>
                      <li>
                        <div>
                          <i class="fa-regular fa-user"></i>
                        </div>
                        <strong>{user.name}</strong>
                      </li>
                      <li>
                        <button
                          className="submit-button"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="login">
                        <a class="dropdown-item " href="/login">
                          Giriş Yap
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/register">
                          Üye ol
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
