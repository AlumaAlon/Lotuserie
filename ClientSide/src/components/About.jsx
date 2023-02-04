import Navbar from "./Navbar";
import Footer from "./Footer";
import "../css/about.css";
function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="container pt-4 pb-4">
        <div className="row">
          <div className="col-6">
            <img
              className="abtImage img-fluid"
              src="aboutImg1.png"
              alt="About Image"
            />
          </div>
          <div className="col-6">
            <h1 className="_coloredSubTitle">Our Story</h1>
            Lotuserie Bakery has been one of Israel’s most-cherished bakeshops
            and set the standard for tried-and-true desserts and baked goods.
            Learn more about our journey from neighborhood gem to sweet success.
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h1 className="_coloredSubTitle">Join Our Team</h1>
            Hospitality is at the heart of the Lotuserie Bakery experience. We
            believe a respectful, empathetic working environment is crucial to
            creating a positive team experience and keeping our guests happy.
            Interested in one of the sweetest gigs around? Visit our careers
            page to see openings at all of our Israel locations.
          </div>
          <div className="col-6">
            <img
              className="abtImage img-fluid"
              src="aboutImg2.png"
              alt="About Image"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            {" "}
            <img
              className="abtImage img-fluid"
              src="aboutImg3.png"
              alt="About Image"
            />
          </div>
          <div className="col-6">
            <h1 className="_coloredSubTitle">Giving Back</h1>
            Even though we’re famous worldwide, Lotuserie Bakery remains a
            neighborhood bakery at heart. We’re committed to serving our local
            communities by supporting small businesses, charities, schools, and
            bake sales. If you’re seeking a product donation for your cause,
            reach out to info@Lotuserie.com or use the link below to tell us
            more!
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h1 className="_coloredSubTitle">Our Products</h1>
            For more than 25 years, Lotuserie Bakery has been making Israel’s
            favorite baked goods the old-fashioned way: from scratch, in small
            batches, and using the finest ingredients. Our assortment includes
            our fan-favorite cakes and cupcakes, world-famous banana pudding,
            and a host of other classic baked goods, seasonal treats, and more.
          </div>
          <div className="col-6">
            <img
              className="abtImage img-fluid"
              src="aboutImg4.png"
              alt="About Image"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
