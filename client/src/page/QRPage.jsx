import "../styles/AsciiPage.css";
import { Header } from "../component/Header";
import { useRef, useState, useEffect } from "react";
import { QRCodeStyling } from "qr-code-styling";
import { HTML5Qrcode } from "html5-qrcode";
import { Herz } from "../media/herz.jpg";
import { Baum } from "../media/baum.png";
import { Drache } from "../media/drache.jpg";
import { Rose } from "../media/rose.png";
import { Dots1 } from "../media/dots/dots-1.png";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { render } from "@testing-library/react";
import { html2canvas } from "html2canvas";

function QRPage() {
  const [text, setText] = useState("");
  const [qrImage, setImage] = useState("");
  const [qrEncode, setEncode] = useState("");

  let stop = true;

  const textfieldEn = document.querySelector(".encrypt-text");
  const textfield = document.querySelector(".decrypt-text");
  const copyButton = document.querySelector(".copy");

  const [dotType, setDotType] = useState("dots"); // Default value here
  const [colorType, setColorType] = useState("singleColor"); // Default value here
  const [dotColor, setDotColor] = useState("#150e7a"); // Default value here
  const [dotColor1, setDotColor1] = useState("#150e7a"); // Default value here
  const [dotColor2, setDotColor2] = useState("#450e7a"); // Default value here
  const [crispEdges, setCrisps] = useState(true);
  //const html5QrCode = new Html5Qrcode(/* element id */ "reader");

  function handleDotTypeChange(e) {
    setDotType(e.currentTarget.value);
  }

  function handleColorTypeChange(e) {
    setColorType(e.currentTarget.value);
    if (colorType === "singleColor") {
      let myColor = document.getElementById("dotColorGradient");
      myColor.style.display = "inline-block";
      let otherColor = document.getElementById("dotColorSingle");
      otherColor.style.display = "none";
    } else {
      let myColor = document.getElementById("dotColorSingle");
      myColor.style.display = "inline-block";
      let otherColor = document.getElementById("dotColorGradient");
      otherColor.style.display = "none";
    }
  }

  function handleDotColorChange(e) {
    setDotColor(e.currentTarget.value);
  }

  function handleDotColorChange1(e) {
    setDotColor1(e.currentTarget.value);
  }

  function handleDotColorChange2(e) {
    setDotColor2(e.currentTarget.value);
  }

  function handleCrisps() {
    if (crispEdges === false) {
      setCrisps(true);
    } else {
      setCrisps(false);
    }
  }

  function hoverEncrypt() {
    document.querySelector(".encrypt").style.boxShadow =
      "0 0 20px 12px rgb(81, 0, 92)";
    document.querySelector("#arrow1").style.textShadow = "2px 0 #888888";
    document.querySelector("#arrow1").style.color = "black";
    document.querySelector("#arrow2").style.textShadow = "2px 0 #888888";
    document.querySelector("#arrow2").style.color = "black";
  }

  function unhoverEncrypt() {
    document.querySelector(".encrypt").style.boxShadow =
      "0 0 20px 10px rgb(116, 29, 128)";
    document.querySelector("#arrow1").style.textShadow = "2px 0 rgb(0, 0, 0)";
    document.querySelector("#arrow1").style.color = "#888888";
    document.querySelector("#arrow2").style.textShadow = "2px 0 rgb(0, 0, 0)";
    document.querySelector("#arrow2").style.color = "#888888";
  }

  function hoverDecrypt() {
    document.querySelector(".decrypt").style.boxShadow =
      "0 0 20px 12px rgb(81, 0, 92)";
    document.querySelector("#arrow3").style.textShadow = "2px 0 rgb(0, 0, 0)";
    document.querySelector("#arrow3").style.color = "#888888";
    document.querySelector("#arrow4").style.textShadow = "2px 0 rgb(0, 0, 0)";
    document.querySelector("#arrow4").style.color = "#888888";
  }

  function unhoverDecrypt() {
    document.querySelector(".decrypt").style.boxShadow =
      "0 0 20px 10px rgb(116, 29, 128)";
    document.querySelector("#arrow3").style.textShadow = "2px 0 #888888";
    document.querySelector("#arrow3").style.color = "black";
    document.querySelector("#arrow4").style.textShadow = "2px 0 #888888";
    document.querySelector("#arrow4").style.color = "black";
  }

  const html5QrCode = new Html5Qrcode(/* element id */ "reader");

  const [scan, makeScan] = useState(false);

  async function cameraScan() {
    makeScan(true);
    let uploadQRbutton = document.querySelector("#uploadButton");
    uploadQRbutton.style.display = "none";
    let cameraButton = document.querySelector("#camera");
    cameraButton.style.display = "none";
    let reader = document.querySelector("#reader");
    reader.style.display = "inline-block";
  }

  const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {
      width: 300,
      height: 200,
    },
    fps: 20,
  });

  if (scan) {
    scanning();
  }

  async function scanning() {
    scanner.render(success, error);
  }

  function success(result) {
    let reader = document.querySelector(".qrinput");
    PrintDiv(reader);
    setText(result);
    //Text auf Feld
    //textfieldEn.value = text;
    let uploadQRbutton = document.querySelector("#uploadButton");
    uploadQRbutton.style.display = "inline-block";
    let cameraButton = document.querySelector("#camera");
    cameraButton.style.display = "grid";
    cameraButton.style.placeItems = "center";

    makeScan(false);
    scanner.clear();
  }

  function PrintDiv(div) {
    html2canvas(document.querySelector("#reader__scan_region")).then((canvas) => {
      canvas.id = "imageIDqr";
      document.getElementById("imageQR").appendChild(canvas);

      let myImage = document.getElementById("imageIDqr");
      myImage.style.maxWidth = "100%";
      myImage.style.height = "200px";
      myImage.style.display = "grid";
      myImage.style.margin = "auto";
      let uploadQRbutton = document.querySelector("#uploadButton");
      uploadQRbutton.style.display = "none";
      let cameraButton = document.querySelector("#camera");
      cameraButton.style.display = "none";
    });
  }

  function error(err) {
    console.log(err);
  }

  useEffect(() => {
    componentDidMount();
    function componentDidMount() {
      const script = document.createElement("script");

      script.src =
        "https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js";
      script.async = true;

      document.body.appendChild(script);

      const script2 = document.createElement("script");
      script2.src = "https://unpkg.com/html5-qrcode";
      script2.async = true;
      document.body.appendChild(script2);
    }
  }, []);

  const qrCodeSingle = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: text,
    image: qrImage,
    dotsOptions: {
      color: dotColor,
      type: dotType,
      roundSize: crispEdges,
    },
    backgroundOptions: {
      color: "white",
      hideBackgroundDots: true,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20,
    },
  });

  const qrCodeGradient = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: text,
    image: qrImage,
    dotsOptions: {
      color: dotColor,
      type: dotType,
      roundSize: crispEdges,
      gradient: {
        type: "radial",
        colorStops: [
          { offset: 0, color: dotColor1 },
          { offset: 1, color: dotColor2 },
        ],
        rotation: 0,
      },
    },
    backgroundOptions: {
      color: "white",
      hideBackgroundDots: true,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20,
    },
  });

  let qr = false;

  if (document.getElementById("canvasqr")) {
    qr = true;
  } else {
    qr = false;
  }
  let canvasqr = document.querySelector("#canvasqr");

  function newQR(event) {
    event.preventDefault();

    if (text === "" || text === undefined) {
      stop = true;
    } else {
      stop = false;
    }

    if (stop === false) {
      if (canvasqr.childNodes.length > 0) {
        let svg = document.querySelector("svg");
        canvasqr.removeChild(svg);
      }

      if (colorType === "singleColor") {
        qrCodeSingle.append(document.getElementById("canvasqr"));
      } else {
        qrCodeGradient.append(document.getElementById("canvasqr"));
      }

      copyButton.style.display = "inline-block";
      textfield.style.display = "none";
      let qr = document.getElementById("canvasqr");
      qr.style.maxWidth = "100%";
      qr.style.width = "100%";
      qr.style.display = "grid";
      qr.style.placeItems = "center";
      //Android Smooth Downscrolling
      let qrHead = document.querySelector(".decrypthead");
      qrHead.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("Please enter some text :)");
    }
  }

  function downloadQR() {
    if (colorType === "singleColor") {
      qrCodeSingle.download("jpeg");
    } else {
      qrCodeGradient.download("jpeg");
    }
  }

  function changedPicture(e) {
    if (document.getElementById("imageID")) {
      document.getElementById("imageID").remove();
    }
    setImage("");

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.id = "canvasqr";
      image.src = event.target.result;
      setImage(image.src);

      image.onload = () => {
        document.querySelector("#preview").src = qrImage;
      };
      image.src = event.target.result;
      image.id = "imageID";
      document.getElementById("images").appendChild(image);
      let myImage = document.getElementById("imageID");
      myImage.style.maxWidth = "100%";
      myImage.style.height = "200px";
      myImage.style.display = "grid";
      myImage.style.margin = "auto";
    };

    reader.readAsDataURL(file);
  }

  const useExample = (event) => {
    clearImage();
    console.log(event);
    const img = document.createElement("img");

    img.src = event.target.src;
    img.id = "imageID";

    // Append the image to a specific element in the document
    document.getElementById("images").appendChild(img);

    let myImage = document.getElementById("imageID");
    myImage.style.maxWidth = "100%";
    myImage.style.height = "200px";
    myImage.style.display = "grid";
    myImage.style.margin = "auto";
    setImage(event.target.src);
  };

  function hideRenderer() {
    let reader1 = document.querySelector("#reader");
    reader1.style.display = "none";
    let uploadQRbutton = document.querySelector("#uploadButton");
    uploadQRbutton.style.display = "inline-block";
    let cameraButton = document.querySelector("#camera");
    cameraButton.style.display = "grid";
  }

  function changedQR(e) {
    const file1 = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();

      image.src = event.target.result;
      image.id = "imageQR";
      setEncode(image.src);

      image.src = event.target.result;
      image.id = "imageIDqr";
      document.getElementById("imageQR").appendChild(image);
      let myImage = document.getElementById("imageIDqr");
      myImage.style.maxWidth = "100%";
      myImage.style.height = "200px";
      myImage.style.display = "grid";
      myImage.style.margin = "auto";
      let uploadQRbutton = document.querySelector("#uploadButton");
      uploadQRbutton.style.display = "none";
      let cameraButton = document.querySelector("#camera");
      cameraButton.style.display = "none";

      file1.value = null;

      html5QrCode
        .scanFile(e.target.files[0], true)
        .then((decodedText) => {
          // success, use decodedText
          setText(decodedText);
        })
        .catch((err) => {
          // failure, handle it.
          console.log(`Error scanning file. Reason: ${err}`);
        });
    };

    reader.readAsDataURL(file1);
  }

  function clearQR() {
    let uploadQRbutton = document.querySelector("#uploadButton");
    uploadQRbutton.style.display = "inline-block";
    let cameraButton = document.querySelector("#camera");
    cameraButton.style.display = "grid";
    cameraButton.style.placeItems = "center";
    let uploadFile = document.querySelector("#uploadQR");
    uploadFile.value = "";

    makeScan(false);
    let reader = document.querySelector("#reader");
    reader.style.display = "none";

    let imageField = document.querySelector("#imageQR");

    if (imageField.childNodes.length > 0) {
      let img = document.querySelector("#imageIDqr");
      imageField.removeChild(img);
    }
    if (qr) {
      copyButton.style.display = "none";
      textfield.style.display = "inline-block";
      if (canvasqr.childNodes.length > 0) {
        let svg = document.querySelector("svg");
        canvasqr.removeChild(svg);
      }
    } else {
      return;
    }
  }

  function clearText() {
    document.getElementsByClassName("encrypt-text")[0].value = "";
  }

  function clearImage() {
    if (document.getElementById("imageID")) {
      document.getElementById("imageID").remove();
    }
    setImage("");
    let uploadImage = document.querySelector("#upload");
    uploadImage.value = "";
  }

  function decrypt() {
    textfieldEn.value = text;
    let head = document.querySelector("#text");
    head.scrollIntoView({ behavior: "smooth" });
  }

  let decryp1 = "↑";
  let encryp1 = "↓";

  let encryp2 = ">";
  let decryp2 = "<";
  return (
    <>
      <Header></Header>

      <div className="body">
        <div className="header-ascii">
          <div className="buttons" id="text">
            <nav className="encryphead">
              Text
              <button className="clear" onClick={clearText}>
                clear
              </button>
            </nav>
            <textarea
              className="encrypt-text"
              name="text"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <div className="buttons" id="dots">
            <nav className="dotshead">Dots</nav>
            <select
              name="dotsmenu"
              id="dotType"
              value={dotType}
              onChange={handleDotTypeChange}
            >
              <option value="dots">dots</option>
              <option value="rounded">rounded</option>
              <option value="classy">classy</option>
              <option value="square">square</option>
              <option value="classy-rounded">classy-rounded</option>
              <option value="extra-rounded">extra-rounded</option>
            </select>

            <select
              name="dotsmenu"
              id="colorType"
              value={colorType}
              onChange={handleColorTypeChange}
            >
              <option value="singleColor">single Color</option>
              <option value="gradientColor">gradient Color</option>
            </select>

            <div className="dotColorSingle" id="dotColorSingle">
              color
              <input
                type="color"
                id="body"
                name="body"
                className="colorButton"
                value={dotColor}
                onChange={handleDotColorChange}
              />
            </div>

            <div className="dotColorGradient" id="dotColorGradient">
              color
              <input
                type="color"
                id="body"
                name="body"
                className="colorButton"
                value={dotColor1}
                onChange={handleDotColorChange1}
              />
              <input
                type="color"
                id="body"
                name="body"
                className="colorButton"
                value={dotColor2}
                onChange={handleDotColorChange2}
              />
            </div>

            <div className="crispContainer">
              <div className="crisp">crisp edges</div>

              <input
                className="crispCheckbox"
                type="checkbox"
                id="crispCheckbox"
                onClick={handleCrisps}
              ></input>
            </div>
          </div>

          <div className="buttons" id="image">
            <nav className="encryphead">
              Image
              <button className="clear" onClick={clearImage}>
                clear
              </button>
            </nav>
            <div className="example">
              <label for="upload" class="custom-file-upload" color="white">
                <div className="inputContainer">
                  <i class="fa-solid fa-file-arrow-up"></i>
                </div>
              </label>
              <input
                id="upload"
                type="file"
                onChange={changedPicture}
                name="picture"
                required
              />

              <img id="rose" src={Rose} onClick={useExample}></img>

              <img id="herz" src={Herz} onClick={useExample}></img>

              <img id="drache" src={Drache} onClick={useExample}></img>

              <img id="baum" src={Baum} onClick={useExample}></img>
            </div>

            <div id="images"></div>
          </div>

          <div className="buttonUse">
            <button
              className="encrypt"
              onClick={newQR}
              onMouseOver={hoverEncrypt}
              onMouseOut={unhoverEncrypt}
            >
              <i className="fa-solid fa-lock"></i>{" "}
              <div className="arrow" id="arrow1">
                {encryp1}
              </div>
              <div className="arrow" id="arrow2">
                {encryp2}
              </div>
            </button>
            <button
              className="decrypt"
              onClick={decrypt}
              onMouseOver={hoverDecrypt}
              onMouseOut={unhoverDecrypt}
            >
              <div className="arrow" id="arrow3">
                {decryp1}
              </div>
              <div className="arrow" id="arrow4">
                {decryp2}
              </div>{" "}
              <i className="fa-solid fa-lock-open"></i>
            </button>
          </div>

          <div className="overqr">
            <div className="buttons">
              <nav className="decrypthead">
                QR-Code
                <button className="clear" onClick={clearQR}>
                  clear
                </button>
              </nav>
              <div className="decrypt-text" name="decrypttext">
                <div className="qrinput">
                  <label
                    id="uploadButton"
                    for="uploadQR"
                    class="custom-file-upload"
                    color="white"
                    onClick={hideRenderer}
                  >
                    <div className="inputContainer2" onClick={cameraScan}>
                      <i class="fa-solid fa-file-arrow-up"></i>
                    </div>
                  </label>
                  <input
                    id="uploadQR"
                    type="file"
                    onChange={changedQR}
                    name="pictureQR"
                    required
                  />
                  <div
                    className="inputContainer2"
                    id="camera"
                    onClick={cameraScan}
                  >
                    <i class="fa-solid fa-camera"></i>
                  </div>
                  <div id="reader"></div>
                  <image id="imageQR"></image>
                </div>
              </div>
              <div id="canvasqr"></div>
              <canvas id="preview"></canvas>
            </div>

            <div className="copyDownload">
              <div>
                <button className="copy" id="copyButton" onClick={downloadQR}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QRPage;
