import Footer from "./footer";

import Navbar from "./navbar";

function LibraryPage() {
return (
<html lang="en">
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

    <Navbar/>

    <div class="col container page-heading">
      <div class="right-aligned">
        <a href="index.html">Home</a>
        Library
      </div>
    </div>

    <div class="library-image">
      <div class="container">
        <img
          src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/yss4086.jpg"
          alt=""
        />
      </div>
    </div>

    <div class="library-text">
      <div class="container">
        <p>
          In by an appetite no humoured returned informed. Possession so
          comparison inquietude he he conviction no decisively. Marianne
          jointure attended she hastened surprise but she. Ever lady son yet you
          very paid form away. He advantage of exquisite resolving if on
          tolerably. Become sister on in garden it barton waited on. Article
          evident arrived express highest men did boy. Mistress sensible
          entirely am so.
        </p>
        <p>
          Quick can manor smart money hopes worth too. Comfort produce husband
          boy her had hearing. Law others theirs passed but wishes. You day real
          less till dear read. Considered use dispatched melancholy sympathize
          discretion led. Oh feel if up to till like. Why painful the sixteen
          how minuter looking nor. Subject but why ten earnest husband imagine
          sixteen brandon. Are unpleasing occasional celebrated motionless
          unaffected conviction out. Evil make to no five they.
        </p>
        <p>
          Stuff at avoid of sense small fully it whose an. Ten scarcely distance
          moreover handsome age although. As when have find fine or said no
          mile. He in dispatched in imprudence dissimilar be possession
          unreserved insensible. She evil face fine calm have now.
        </p>
        <p>
          Separate screened he outweigh of distance landlord. Do play they miss
          give so up. Words to up style of since world. We leaf to snug on no
          need. Way own uncommonly travelling now acceptance bed compliment
          solicitude. Dissimilar admiration so terminated no in contrasted it.
          Advantages entreaties mr he apartments do. Limits far yet turned
          highly repair parish talked six. Draw fond rank form nor the day eat.
        </p>
      </div>
    </div>

    <div class="team-section container">
      <div class="section-heading">
        <h2 class="fw-light">Meet the Writers</h2>
        <h6 class="fw-light">Who writes and publishes</h6>
        <span class="dash"></span>
        <div class="team-row">
          <div class="row">
            <div class="col-3">
              <img
                src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/team1-250x250.png"
                alt=""
              />
              <h4 class="fw-light m-3">John Riptide
                <small >Novelist</small>
              </h4>
            </div>
            <div class="col-3">
              <img
                src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/team3-250x250.png"
                alt=""
              />
              <h4 class="fw-light m-3">John Riptide
                <small >Novelist</small>
              </h4>
            </div>
            <div class="col-3">
              <img
                src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/team2-250x250.png"
                alt=""
              />
              <h4 class="fw-light m-3">John Riptide
                <small >Novelist</small>
              </h4>
            </div>
            <div class="col-3">
              <img
                src="https://themes.laborator.co/aurum/bookshop/wp-content/uploads/2015/01/team4-250x250.png"
                alt=""
              />
              <h4 class="fw-light m-3">John Riptide
                <small >Novelist</small>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
        <Footer />


    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

    <script src="script.js"></script>
  </body>
</html>


)}

export default LibraryPage;