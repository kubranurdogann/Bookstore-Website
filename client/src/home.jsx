import { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useLocation } from "react-router-dom";

function HomePage() {
  const [kitaplar, setBooks] = useState([]);
  const location = useLocation();
  const user = location.state;

  useEffect(() => {
    if (user) {
      console.log("Giriş yapan kullanıcı:", user);
    }
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:3000/api/kitaplar")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Veri alınamadı:", err));
  }, []);

  const [cokSatanlar, setCokSatanlar] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/kitaplar/cok-satanlar")
      .then((res) => res.json())
      .then((data) => setCokSatanlar(data))
      .catch((err) => console.error("Çok satanlar alınamadı:", err));
  }, []);

  //Home page çok satanlar  slider ayarları
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const enCokSatanYazar = "Paulo Coelho";
  const pauloKitaplari = kitaplar?.filter(
    (kitap) => kitap.yazarAdi?.toLowerCase() === enCokSatanYazar.toLowerCase()
  );

  return (
    <>
      <Navbar />

      <div className="slider-section">
        <img
          src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2017/10/Ocelot_Berlin_02.jpg"
          alt=""
        />
        <div className="slider-text">
          <h1>The world is quiet here </h1>
          <p className="fw-light">- Lemony Snicket</p>
        </div>
      </div>

      <div className="section1 bg-white paddingx pb-100">
        <div
          className="container"
          style={{ maxWidth: "100%", padding: "0 30px" }}
        >
          <h2 className="fw-light">Bestsellers</h2>
          <h5 className="text-secondary fw-light mb-4">
            Top selling books of 2023
          </h5>
          <a href="/books">
            {cokSatanlar?.length > 0 && (
              <Slider
                {...settings}
                style={{ display: "flex", overflow: "visible", width: "100%" }}
                className="custom-slider"
              >
                {cokSatanlar.map((kitap) => (
                  <div
                    key={kitap._id}
                    className="p-2"
                    style={{ minWidth: "180px" }}
                  >
                    <img
                      src={kitap.imgUrl}
                      alt={kitap.kitapAdi}
                      className="w-100"
                    />
                  </div>
                ))}
              </Slider>
            )}
          </a>
        </div>
      </div>
      <div class="section2 bg-white paddingx pb-100">
        <div class="container">
          <h2 class="fw-light">Author of the Month</h2>
          <h5 class="text-secondary fw-light mb-4">And his/her Bestsellers</h5>
          <div class="row">
            <div class="col-4">
              <img
                src="https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-350,h-531,fo-auto/contributor/41946.jpg"
                alt=""
              />
            </div>
            <div class="col-8">
              <div class="author-info">
                <h2 class="header">
                  Paulo Coelho<small>Novel Prize Winner 2008</small>
                </h2>
                <span class="dash"></span>
                <p>
                  Inhabit hearing perhaps on ye do no. It maids decay as there
                  he. Smallest on suitable disposed do although blessing he
                  juvenile in. Society or if excited forbade. Here name off yet
                  she long sold easy whom. Differed oh cheerful procured
                  pleasure securing suitable in. Hold rich on an he oh fine.
                  Chapter ability shyness article welcome be do on service.
                </p>
              </div>
              <div className="row">
                {pauloKitaplari?.map((kitap) => (
                  <div className="col-md-3 mb-4" key={kitap._id}>
                    <div className="card">
                      <img
                        src={kitap.imgUrl}
                        className="card-img-top"
                        alt={kitap.kitapAdi}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <a href="/books">
                  <button className="submit-button">MORE BOOK</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section3 paddingx">
        <div class="container px-4">
          <div class="row">
            <div class="col-4 img-p">
              <div class="img-banner">
                <img
                  src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/Bookshelf2-720x440.jpg"
                  alt=""
                />
                <span class="ol"></span>
                <div class="banner-text-container">
                  <div class="banner-text-content">
                    <strong>Library</strong>
                    <em class="border-top">Reading space</em>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4 img-p">
              <div class="img-banner">
                <img
                  src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/ssb-wide1-720x440.jpg"
                  alt=""
                />
                <span class="ol"></span>
                <div class="banner-text-container">
                  <div class="banner-text-content">
                    <strong>Furnushing</strong>
                    <em class="border-top">Home Furnishment</em>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4 img-p">
              <div class="img-banner">
                <img
                  src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/amazon-kindle-3-nyt-660x408.jpg"
                  alt=""
                />
                <span class="ol"></span>
                <div class="banner-text-container">
                  <div class="banner-text-content">
                    <strong>e-books</strong>
                    <em class="border-top">Your reading tool</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section4 bg-white paddingx pt-100">
        <div class="container">
          <h2 class="fw-light">What people say?</h2>

          <div id="carouselExampleCaptions" class="carousel slide pt-3">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-1">
                    <img
                      src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/04/128-4.jpg"
                      alt=""
                    />
                  </div>
                  <div class="col-11">
                    <p>
                      This is the best theme I found for my fashion shop. I was
                      looking for a theme with beautiful minimal design, easy to
                      install and setup, responsive and full featured. Aurum is
                      exactly what I needed, and even more: The team offer a
                      lovely support and for a beginner like me it is a crucial
                      point! Thank you Laborator for your work, and continuous
                      success!
                    </p>
                    <cite>ays3</cite>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-1">
                    <img
                      src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/04/128-1.jpg"
                      alt=""
                    />
                  </div>
                  <div class="col-11">
                    <p>
                      Very nice theme, it adapts to whatever you need and has a
                      great design. Do not hesitate to buy it. Quality and
                      efficient technical support.
                    </p>
                    <cite>Loctecmark</cite>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-1">
                    <img
                      src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/04/128.jpg"
                      alt=""
                    />
                  </div>
                  <div class="col-11">
                    <p>
                      Good support of theme. When a problem arose for my
                      specific installation, they were able to track it down and
                      fix it.
                    </p>
                    <cite>xavier</cite>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"
      ></script>
    </>
  );
}

export default HomePage;
