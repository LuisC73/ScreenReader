window.addEventListener('DOMContentLoaded',() =>{

 
  // Barra accesibilidad
  const $audio = document.getElementById("narradorAC"),
    $audioIMG = document.getElementById('narradorIMG'),
    $moreFont = document.getElementById("aumentarAC"),
    $lessFont = document.getElementById("disminuirAC"),
    $normalFont = document.getElementById("reiniciarAC"),
    $dyslexic = document.getElementById("dislexicosAC"),
    $hues = document.getElementById("tonoAC"),
    $cursor = document.getElementById("cursorAC"),
    $contraste = document.getElementById("contrasteAC"),
    $screenreaderLogo = document.querySelector('.barraAccesibilidad__logo'),
    $screenreader = document.querySelector('.barraAccesibilidad');

    $screenreaderLogo.addEventListener('click',() =>{
      $screenreader.classList.toggle('barraAccesibilidad--active')
    })

  const $html = document.querySelector("html"),
    $body = document.querySelector("body"),
    $allFont = document.querySelectorAll(
      "span, p, a, h1, h2, h3, h4, h5, input, div, .titulos, #testimonios > .card-title, .evento-fecha-2,button,strong,td"
    );

  const $allFont2 = document.querySelectorAll(
    "p, a, h1, h2, h3, h4, h5, input, div, .titulos, #testimonios > .card-title, .evento-fecha-2,button, .w3layouts_event_grid"
  );

  function changeSizeFont(type) {
    $allFont.forEach((el) => {
      let fontSize = window
        .getComputedStyle(el, null)
        .getPropertyValue("font-size");
      fontSize = parseFloat(fontSize);
      if (type == "more" && fontSize < 23) {
        el.style.fontSize = fontSize + 5 + "px";
      } else if (type == "less" && fontSize > 11) {
        el.style.fontSize = fontSize - 5 + "px";
      } else {
        el.style.fontSize = fontSize + "px";
      }

      if (type == "normal") {
        el.style.fontSize = 15 + "px";
        el.classList.toggle("font-dyslexic");
        el.classList.contains("font-dyslexic")
          ? el.classList.remove("font-dyslexic")
          : "";
      }
    });
  }

  $moreFont.addEventListener("click", () => changeSizeFont("more"));
  $lessFont.addEventListener("click", () => changeSizeFont("less"));
  $normalFont.addEventListener("click", () => changeSizeFont("normal"));

  function addClass(nameClass, button) {
    document.addEventListener("click", (e) => {
      if (e.target == button) $body.classList.toggle(nameClass);
    });
  }

  // Alto contraste
  $contraste.addEventListener("click", () =>
    addClass("scr_highcontrast", $contraste)
  );

  // Fuente para dislexicos
  $dyslexic.addEventListener("click", () => {
    $allFont2.forEach((el) => {
      el.classList.toggle("font-dyslexic");
    });
  });

  // Tono gris
  $hues.addEventListener("click", () => {
    addClass("scr_grayHues", $hues);
  });

  // Cursor
  $cursor.addEventListener("click", () => {
    addClass("scr_bigcursor", $cursor);
  });

  let textToSpeak = document.querySelectorAll("h1, h2, p, a");
  let speakerOnOff = false;
  let speak = new SpeechSynthesisUtterance();
  let volume = 1
  speak.volume = volume
  $audio.addEventListener("click", () => {
    speakerOnOff = !speakerOnOff;
    $audioIMG.getAttribute("src") == "/Style Library/ScreenReaderV3/imagenes/play.svg"
      ? ($audioIMG.src = "/Style Library/ScreenReaderV3/imagenes/stop.svg")
      : ($audioIMG.src = "/Style Library/ScreenReaderV3/imagenes/play.svg");
  });

  $allFont.forEach((item) => {
    item.addEventListener("mouseover", () => {
      speak.text = item.textContent;
      if (speakerOnOff) {
        speechSynthesis.speak(speak);
      }
    });
    item.addEventListener("mouseout", () => {
      speechSynthesis.cancel();
    });
  });

  // $volumen.addEventListener("click", () => {
  //   $volumen.getAttribute("src") == "/Style Library/Images/volume.svg"
  //     ? ($volumen.src = "/Style Library/Images/mute.svg")
  //     : ($volumen.src = "/Style Library/Images/volume.svg");
  //     volume == 1 ? volume = 0 : volume = 1
  //     speak.volume = volume
  // });
})