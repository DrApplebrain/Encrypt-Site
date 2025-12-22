import NavLink from "react-router-dom";
import Header from "../component/Header";
import AsciiSmileyPNG from "../media/smile.png";
import AsciiSmileyGIF from "../media/smile.gif";
import QRCodePNG from "../media/qr-code.png";
import QRSmileyPNG from "../media/qr-smiley3.png";
import QRSmileyGIF from "../media/qr-smiley3.gif";
import "../styles/Home.css";

function Home() {
  function AsciiAnimation() {
    document.querySelector(".ascii-image").src = AsciiSmileyGIF;
    document.querySelector(".ascii").style.boxShadow =
      "0 0 20px 15px rgb(255, 230, 0)";
  }
  function AsciiAnimationStop() {
    document.querySelector(".ascii-image").src = AsciiSmileyPNG;
    document.querySelector(".ascii").style.boxShadow =
      "0 0 20px 10px rgb(255, 230, 0)";
  }

  function QRAnimation() {
    document.querySelector(".qr-smiley").src = QRSmileyGIF;
    document.querySelector(".qrcode").style.boxShadow =
      "0 0 20px 15px rgb(255, 0, 13)";
  }

  function QRAnimationStop() {
    document.querySelector(".qr-smiley").src = QRSmileyPNG;
    document.querySelector(".qrcode").style.boxShadow =
      "0 0 20px 10px rgb(255, 0, 13)";
  }

  return (
    <div className="home">
      <Header></Header>
      <div className="file-format">
        <nav
          className="ascii"
          onMouseOver={AsciiAnimation}
          onMouseOut={AsciiAnimationStop}
        >
          <NavLink className="house2" to="/ascii">
            <img className="ascii-image" src={AsciiSmileyPNG}></img>
            <div className="text">
              <h2>Generate Ascii-Code</h2>
              <p>
                Encrypt and Decrypt your text into art with our ASCII generator
                and maker.
                <br></br>Effortlessly create banners, signatures, and a myriad
                of custom ASCII designs.
              </p>
            </div>
          </NavLink>
        </nav>

        <nav
          className="qrcode"
          onMouseOver={QRAnimation}
          onMouseOut={QRAnimationStop}
        >
          <NavLink className="qr" to="/qr">
          <div className="image">
            <img className="qr-image" src={QRCodePNG}></img>
            <img
              className="qr-smiley"
              src={QRSmileyPNG}
              onMouseOver={QRAnimation}
              onMouseOut={QRAnimationStop}
            ></img></div>
            <div className="text">
              <h2>Generate QR-Code</h2>
              <p>
                Transform your text into art with our advanced ASCII generator
                and maker.
                <br></br>Effortlessly create banners, signatures, and a myriad
                of custom ASCII designs.
              </p>
            </div>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default Home;
