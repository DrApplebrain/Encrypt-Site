import "../styles/Header.css";
import useNavigate from "react-router-dom";

function Header() {
  let hamburgerClick = false;
  let hamburgerHover = false;
  function getCurrentURL() {
    return window.location.href;
  }

  function hoverHouse() {
    document.querySelector(".house").style.boxShadow =
      "0 0 20px 15px rgb(255, 230, 0)";
  }

  function unhoverHouse() {
    document.querySelector(".house").style.boxShadow =
      "0 0 20px 10px rgb(255, 230, 0)";
  }

  function flipHamburger(){
    if(hamburgerClick || hamburgerHover){
      hamburgerClick = false;
      hamburgerHover = false;
      document.querySelector(".hamburger").style.boxShadow =
      "0 0 20px 10px rgb(255, 0, 13)";
      document.querySelector(".menu").style.display = "none";
    }
    else{
      hamburgerClick = true;
      hamburgerHover = true;
      document.querySelector(".hamburger").style.boxShadow =
      "0 0 20px 15px rgb(255, 0, 13)";
      document.querySelector(".menu").style.display = "block";
    } 
  }

  function hoverHamburger() {
    hamburgerHover = true;
    if(hamburgerClick || hamburgerHover){
    document.querySelector(".hamburger").style.boxShadow =
      "0 0 20px 15px rgb(255, 0, 13)";
      document.querySelector(".menu").style.display = "block";
    }
  }

  function unhoverHamburger() {
    hamburgerHover = false;
    if(!hamburgerClick || !hamburgerHover){
    document.querySelector(".hamburger").style.boxShadow =
      "0 0 20px 10px rgb(255, 0, 13)";
      document.querySelector(".menu").style.display = "none";
    }
  }

  let navigate = useNavigate(); 
  const routeChangeHome = () =>{ 
    let home = `/`; 
    navigate(home);
  }
  const routeChangeASCII = () =>{ 
    let ascii = `/ascii`; 
    navigate(ascii);
  }
  const routeChangeQR = () =>{ 
    let qr = `/qr`; 
    navigate(qr);
  }
  

  let site = "";

  // Example
  let url = getCurrentURL();
  if (url.slice(-1) === "/") {
    site = "Home";
  }
  if (url.slice(-5) === "ascii") {
    site = "ASCII-Code";
  }
  if (url.slice(-2) === "qr") {
    site = "QR-Code";
  }

  return (
    <div className="header">
      <div className="house" onMouseOut={unhoverHouse} onMouseOver={hoverHouse} onClick={routeChangeHome}>
          <i className="fa-solid fa-house-chimney"></i>{" "}
      </div>
      <h1 className="headerh1">{site}</h1>
      <div
        className="hamburger"
        onMouseOut={unhoverHamburger}
        onMouseOver={hoverHamburger}
        onClick={flipHamburger}
      >
        <i className="fa-solid fa-burger"></i>
      </div>
      <div></div>
      <div></div>
      <div className="menus">
        <div className="menu" onMouseOver={hoverHamburger} onMouseOut={unhoverHamburger}>
          <div className="ascii-menu" onClick={routeChangeASCII}>Generate Ascii-Code</div>
          <div className="qrcode-menu" onClick={routeChangeQR}>Generate QR-Code</div>
        
        </div>
      </div>
    </div>
  );
}

export default Header;
