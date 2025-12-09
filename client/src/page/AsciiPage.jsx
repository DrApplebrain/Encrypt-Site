import "../styles/AsciiPage.css";
import Header from "../component/Header";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Herz from "../media/herz.jpg";
import Baum from "../media/baum.png";
import Drache from "../media/drache.jpg";
import Rose from "../media/rose.png";

function AsciiPage() {
  const fileInput = document.querySelector('input[type="file"');
  const textfieldEncryption = document.querySelector(".encrypt-text");
  const textfieldDecryption = document.querySelector(".decrypt-text");
  const copyButton = document.querySelector(".copy");
  const downloadButton = document.querySelector(".download");
  const asciiImage = document.getElementById("ascii");

  const [asciiColor, setAsciiColor] = useState("#000000ff"); // Default value here

  const canvasRefpreview = useRef(null);
  const canvasRefascii = useRef(null);
  const [canvasContext, setCanvasContext] = useState(null);
  const [canvasContextAscii, setCanvasContextAscii] = useState(null);
  const [chars, setChars] = useState(50);
  useEffect(() => {
    const canvas = canvasRefpreview.current;
    const context = canvas.getContext("2d");
    const canvasAscii = canvasRefascii.current;
    //const contextAscii = canvasAscii.getContext("2d");
    setCanvasContext(context);
    //setCanvasContextAscii(contextAscii);
  }, []);

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

  function handleCharsChange(e){
    let number = Number(e.currentTarget.value);
    setChars(number);
  }

  function handleasciiColorChange(e) {
    setAsciiColor(e.currentTarget.value);
  }

  let stop = true;
  let grayRamp = ``;
  let symbols = `! ? & $ @ B . % 8 & W M # * o a h k b d p q w m Z O 0 Q L C J U Y X z c v u n x r j f t / | ( ) 1 { } [ ] ? - _ + ~ < > i ! l I ; : , " ^ `;
  let rampLength = grayRamp.length;
  let changed = false;

  function encrypt(event) {
    event.preventDefault();
    let mytext = textfieldEncryption.value;

    if (mytext === "" || mytext === undefined) {
      stop = true;
    } else {
      stop = false;
    }

    let checkImage = document.getElementById("imageID");
    if (checkImage === null) {
      changed = false;
    } else {
      changed = true;
    }

    if(chars === 50){
      let fontSize = document.querySelector("#ascii");
      fontSize.style.fontSize = "3px"
    }

    if(chars === 100){
      let fontSize = document.querySelector("#ascii");
      fontSize.style.fontSize = "2px"
    }

    if(chars === 150){
      let fontSize = document.querySelector("#ascii");
      fontSize.style.fontSize = "1px"
    }

    
    

    if (stop === false && changed) {

      let img = document.querySelector("#imageID");

    const [width, height] = clampDimensions(img.width, img.height);

    canvasContext.width = width;
    canvasContext.height = height;
    canvasContext.drawImage(img, 0, 0, width, height);

    mywidth = width;
    const grayScales = convertToGrayScales(canvasContext, width, height);
    mygray = grayScales;

      let array = grayRamp.split(" ");

      for (let letter = 0; letter < mytext.length; letter += 1) {
        array.push(mytext[letter]);
      }
      array.toString();

      grayRamp = symbols + array.toString();

      rampLength = grayRamp.length;

      drawAscii(mygray, mywidth, mytext);
    } else {
      alert("Please enter some text and choose a picture :)");
    }
  }

  const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

  const getFontRatio = () => {
    const pre = document.createElement("pre");
    pre.style.display = "inline";
    pre.textContent = " ";

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);
    //H
    return height / width;
  };

  const fontRatio = getFontRatio();

  const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const grayScales = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      const grayScale = toGrayScale(r, g, b);
      imageData.data[i] =
        imageData.data[i + 1] =
        imageData.data[i + 2] =
          grayScale;

      grayScales.push(grayScale);
    }

    context.putImageData(imageData, 0, 0);

    return grayScales;
  };

  let MAXIMUM_WIDTH = chars;
  let MAXIMUM_HEIGHT = chars;

  const clampDimensions = (width, height) => {
    const rectifiedWidth = Math.floor(getFontRatio() * width);

    if (height > MAXIMUM_HEIGHT) {
      const reducedWidth = Math.floor(
        (rectifiedWidth * MAXIMUM_HEIGHT) / height
      );
      return [reducedWidth, MAXIMUM_HEIGHT];
    }

    if (width > MAXIMUM_WIDTH) {
      const reducedHeight = Math.floor(
        (height * MAXIMUM_WIDTH) / rectifiedWidth
      );
      return [MAXIMUM_WIDTH, reducedHeight];
    }

    return [rectifiedWidth, height];
  };

  let mygray;
  let mywidth;

  function changedPicture(e) {
    let overImage = document.getElementById("images");
    if (overImage.childNodes.length > 0) {
      let thisImage = document.querySelector("#imageID");
      overImage.removeChild(thisImage);
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = document.createElement("img");
      

      image.src = event.target.result;
      image.id = "imageID";
      document.getElementById("images").appendChild(image);
      let myImage = document.getElementById("imageID");
      myImage.src = event.target.result;
      myImage.style.maxWidth = "100%";
      myImage.style.height = "200px";
      myImage.style.display = "grid";
      myImage.style.margin = "auto";
    };

    reader.readAsDataURL(file);
  }

  const useExample = (event) => {
    let overImage = document.getElementById("images");
    if (overImage.childNodes.length > 0) {
      let thisImage = document.querySelector("#imageID");
      overImage.removeChild(thisImage);
    }
    const img = document.createElement("img");

    img.src = event.target.src;
    img.id = "imageID";
    img.alt = "Description of the image"; // Alt text for accessibility
    // Append the image to a specific element in the document
    document.getElementById("images").appendChild(img);

    let myImage = document.getElementById("imageID");
    myImage.style.maxWidth = "100%";
    myImage.style.maxHeight = "200px";
    myImage.style.display = "grid";
    myImage.style.margin = "auto";

  };

  const getCharacterForGrayScale = (grayScale) =>
    grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

  function drawAscii(mygray, mywidth, mytext, index) {
    let ascii = mygray.reduce((asciiImage, grayScale, index) => {
      let nextChars = getCharacterForGrayScale(grayScale);
      if ((index + 1) % mywidth === 0) {
        nextChars += "\n";
      }

      return asciiImage + nextChars;
    }, "");

    let newAscii = ``;

    let zahl = mytext.length;
    let nummer = 0;

    for (let b = 0; b < ascii.length; b += 1) {
      if (b > 3000) {
        if (b % 9 === 0) {
          if (zahl > 0) {
            zahl -= 1;
            newAscii += mytext.slice(nummer, nummer + 1);
            nummer += 1;
          } else {
            newAscii += ascii[b];
          }
        } else {
          newAscii += ascii[b];
        }
      } else {
        newAscii += ascii[b];
      }
      let Asciicolor = document.querySelector("#ascii")
      Asciicolor.style.color = asciiColor;
    }
    newAscii.slice(-mytext.length);
    asciiImage.textContent = newAscii;
    textfieldDecryption.value = newAscii;
    asciiImage.style.display = "block";
    textfieldDecryption.style.display = "none";
    copyButton.style.display = "inline-block";
    let decryptHead = document.querySelector(".decrypthead");
      decryptHead.scrollIntoView({ behavior: "smooth" });
    //asciiImage.scrollIntoView({ behavior: 'smooth' });
  }

  function clearAscii() {
    asciiImage.textContent = "";
    textfieldDecryption.value = "";
    asciiImage.style.display = "none";
    textfieldDecryption.style.display = "block";
    copyButton.style.display = "none";
  }

  function clearText() {
    textfieldEncryption.value = "";
  }

  function clearImage() {
    if (document.getElementById("imageID")) {
      document.getElementById("imageID").remove();
    }
  }

  function decrypt() {
    let head = document.getElementById("headEncrypt");
    head.scrollIntoView({ behavior: 'smooth' });
    let decryptText = textfieldDecryption.value;
    let decryptedText = ``;
    for (let b = 0; b < decryptText.length; b += 1) {
      if (b > 3000) {
        if (b % 9 === 0) {
          decryptedText += decryptText[b];
        }
      }
    }
    textfieldEncryption.value = decryptedText;
    
  }

  function copy() {
    textfieldDecryption.select();
    textfieldDecryption.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(textfieldDecryption.value);

    // Alert the copied text
    alert("Copied code!");
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
            <nav className="encryphead" id="headEncrypt">
              Text
              <button className="clear" onClick={clearText}>
                clear
              </button>
            </nav>
            <textarea className="encrypt-text" name="text"></textarea>
          </div>

          <div className="buttons" id="dots">
            <nav className="dotshead">Chars</nav>
            <select
              name="dotsmenu"
              id="dotType"
              value={chars}
              onChange={handleCharsChange}
            >
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              
            </select>

            <div className="dotColorSingle" id="dotColorSingle">
              color
              <input  
                type="color"
                id="color"
                name="body"
                className="colorButton"
                value={asciiColor}
                onChange={handleasciiColorChange}
              />
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
              <label htmlFor="upload" class="custom-file-upload" color="white">
                <div className="inputContainer">
                  <i className="fa-solid fa-file-arrow-up"></i>
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

          <div className="buttonUse" id="buttonMiddle">
            <button
              className="encrypt"
              onClick={encrypt}
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

          <div className="buttons" id="asciifield">
            <nav className="decrypthead">
              ASCII
              <button className="clear" onClick={clearAscii}>
                clear
              </button>
            </nav>
            <pre id="ascii"></pre>
            
            <textarea className="decrypt-text" name="decrypttext"></textarea>
            <div className="copyDownload">
              <div>
                <button className="copy" onClick={copy}>
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="preview">
            <canvas ref={canvasRefpreview} id="preview" display="none"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
export default AsciiPage;
