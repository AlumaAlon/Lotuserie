import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Pnf() {
  return (
    <>
      <Navbar />
      <div className="container main">
        <div className="pnf">
          <img
            className="img-fluid"
            src="../pagenotfound.png"
            alt="Page Not Found"
          />
        </div>
        <div className="msg text-center mb-5">
          <h5>The page you are looking for is not found... </h5>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pnf;
