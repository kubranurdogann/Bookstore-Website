import Navbar from "./navbar";
import Footer from "./footer";
import { useParams, useLocation } from "react-router-dom";

function BookPage() {
    const { id } = useParams();
  const location = useLocation();
  const kitap = location.state?.kitap;

  return (
    <>
       <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>The Bookstore</title>
        <link rel="stylesheet" href="../css/style.css" />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </head>
      <body>
        <Navbar />

        <div className="books paddingx pt-3">
          <div className="container">
            <h2 className="fw-light">Books</h2>
            <div className="row">
              <div className="col-3">
                <div className="products-sidebar">
                  <h5>Booksellers</h5>
                  <div class="line"></div>
                  <ul class="product-list">
                    <li>
                      <a href="#">
                        <img
                          src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/koveri-232x300.png"
                          alt=""
                        />
                        <span>The Beauty and The Beast</span>
                      </a>
                      <span class="amount">€28.00</span>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/14BESTCOVERS-slide-BLZC-jumbo-v2-232x300.jpg"
                          alt=""
                        />
                        <span>A Girl a Half-Formed Thing</span>
                      </a>
                      <span class="amount">€28.00</span>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/koveri-232x300.png"
                          alt=""
                        />
                        <span>The Beauty and The Beast</span>
                      </a>
                      <span class="amount">€28.00</span>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/14BESTCOVERS-slide-BLZC-jumbo-v2-232x300.jpg"
                          alt=""
                        />
                        <span>A Girl a Half-Formed Thing</span>
                      </a>
                      <span class="amount">€28.00</span>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/koveri-232x300.png"
                          alt=""
                        />
                        <span>The Beauty and The Beast</span>
                      </a>
                      <span class="amount">€28.00</span>
                    </li>
                  </ul>
                </div>
                <div className="search-library mt-5 mb-5">
                  <h5>Search The Library</h5>
                  <div className="line"></div>
                  <input
                    type="search"
                    className="search-field mt-3"
                    placeholder="Search products…"
                  />
                  <button className="search-button">Search</button>
                </div>
              </div>
              <div className="col-9">
                <div className="row">
                    <div className="col-8">
                        <div>
                            <span className="back"> 
                              <a href="/books">&lt;Geri Dön</a>
                            </span>
                        </div>
                        <div className="text-end">
                            <h2>{kitap.kitapAdi}</h2>
                            <h6>{kitap.yazarAdi}</h6>      
                            <h6> {kitap.tür}  </h6>
                            <br></br>
                            <p>{kitap.aciklama}</p>
                        
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="book-img">
                            <img src={kitap.imgUrl} alt="book" />
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </body> 
    </>
      
  );
}

export default BookPage;
