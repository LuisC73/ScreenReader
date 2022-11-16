import design from "/Style Library/ScreenReaderV3/design.js";

window.addEventListener("DOMContentLoaded", () => {
  //insertar barra lateral al html
  design();

  const direccion = `/Style Library/ScreenReaderV3`;

  // Elementos del Dom para el funcionamiento de la barra, ademas de la
  // seleccion de todas las letras.
  const $audio = document.getElementById("narradorAC"),
    $audioIMG = document.getElementById("narradorIMG"),
    $moreFont = document.getElementById("aumentarAC"),
    $lessFont = document.getElementById("disminuirAC"),
    $normalFont = document.getElementById("reiniciarAC"),
    $dyslexic = document.getElementById("dislexicosAC"),
    $hues = document.getElementById("tonoAC"),
    $cursor = document.getElementById("cursorAC"),
    $contraste = document.getElementById("contrasteAC"),
    $highlight = document.getElementById("resaltarAC"),
    $moreSpacing = document.getElementById("espaciadoAC"),
    $lessSpacing = document.getElementById("disminuirEspaciadoAC"),
    $screenreaderLogo = document.querySelector(".barraAccesibilidad__logo"),
    $logoImg = document.querySelector(".barraAccesibilidad__lg"),
    $screenreader = document.querySelector(".barraAccesibilidad"),
    $body = document.querySelector("body"),
    $allFont = document.querySelectorAll(
      "span, p, a, h1, h2, h3, h4, h5, input, div, .titulos,.titulo,#testimonios > .card-title, .evento-fecha-2,button,strong,td,.w3layouts_event_grid,.nav-link"
    ),
    $allFont2 = document.querySelectorAll(
      "p, a, h1, h2, h3, h4, h5, input, div, .titulos, #testimonios > .card-title, .evento-fecha-2,button, .w3layouts_event_grid,.titulo,.nav-link"
    ),
    $itemsMenu = document.querySelectorAll(".barraAccesibilidad__option"),
    $allLinks = document.querySelectorAll("a");

  // Se inicializa el narrador, el array donde guardamos el tamaño de letra de cada palabra
  let speakerOnOff = false,
    speak = new SpeechSynthesisUtterance(),
    arrayFont = [],
    spacing = 1;

  //Funcion para la activacion del menu y animacion de opciones
  function activeMenu() {
    $screenreader.classList.toggle("barraAccesibilidad--active");
    $itemsMenu.forEach((item, index) => {
      item.style.animation
        ? (item.style.animation = "")
        : (item.style.animation = `itemFade .5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  //Funcion para cambiar el tamaño de letra y resetear
  function changeSizeFont(type) {
    $allFont.forEach((el, i) => {
      let fontSize = window
        .getComputedStyle(el, null)
        .getPropertyValue("font-size");
      fontSize = parseFloat(fontSize);
      arrayFont.push(fontSize);
      if (type == "more" && fontSize < 20) {
        el.style.fontSize = `${fontSize + 0.5}px`;
      } else if (type == "less" && fontSize > 10) {
        el.style.fontSize = `${fontSize - 0.5}px`;
      } else if (type == "normal") {
        arrayFont.forEach((font, index) => {
          if (i == index) el.style.fontSize = `${font}px`;
          if (index == null) el.style.fontSize = `${14}px`;
        });
        el.style.letterSpacing = `normal`;
        if (el.classList.contains("font-dyslexic"))
          el.classList.toggle("font-dyslexic");
        if ($body.classList.contains("scr_highcontrast"))
          $body.classList.toggle("scr_highcontrast");
        if ($body.classList.contains("scr_grayHues"))
          $body.classList.toggle("scr_grayHues");
        if ($body.classList.contains("scr_bigcursor"))
          $body.classList.toggle("scr_bigcursor");
        if (el.classList.contains("src_highlightLink"))
          el.classList.remove("src_highlightLink");
      } else {
        el.style.fontSize = `${fontSize}px`;
      }
    });
  }

  //Funcion para cambiar el espaciado
  function changeSpacing(type) {
    if (type == "more" && spacing < 7) {
      $allFont.forEach((el) => {
        el.style.letterSpacing = `${spacing * 0.5}px`;
      });
      spacing++;
    } else if (type == "less" && spacing > -1) {
      $allFont.forEach((el) => {
        el.style.letterSpacing = `${spacing * 0.5}px`;
      });
      spacing--;
    } else {
      $allFont.forEach((el) => {
        el.style.letterSpacing = `${spacing}px`;
      });
    }
  }

  //Funcion para detectar la etiqueta
  function returnTag(e) {
    let tag = e.srcElement ? e.srcElement.tagName : e.target.type;
    return tag;
  }

  //Funcion para a partir de la etiqueta, encontrar el texto
  function returnText(e) {
    if (
      returnTag(e) == "P" ||
      returnTag(e) == "H1" ||
      returnTag(e) == "H2" ||
      returnTag(e) == "H3" ||
      returnTag(e) == "H4" ||
      returnTag(e) == "H5" ||
      returnTag(e) == "H6" ||
      returnTag(e) == "A" ||
      returnTag(e) == "LI" ||
      returnTag(e) == "SPAN" ||
      returnTag(e) == "STRONG" ||
      returnTag(e) == "BUTTON" ||
      returnTag(e) == "SELECT" ||
      returnTag(e) == "LABEL"
    ) {
      return e.target.textContent;
    } else if (returnTag(e) == "DIV" && e.target.textContent.length <= 100) {
      return e.target.textContent;
    } else if (returnTag(e) == "IMG" && e.target.getAttribute("alt")) {
      return e.target.getAttribute("alt");
    } else if (returnTag(e) == "INPUT" && e.target.getAttribute("value")) {
      return e.target.getAttribute("value");
    } else if (
      returnTag(e) == "INPUT" &&
      e.target.getAttribute("placeholder")
    ) {
      return e.target.getAttribute("placeholder");
    } else {
      return "";
    }
  }

  //Funcion para el narrador en evento hover
  function screenReader(value) {
    let mediaQuery = window.matchMedia("(max-width: 800px)");
    speakerOnOff = value;
    speak.lang = "es-ES";
    speak.rate = 1.3;
    if (mediaQuery.matches) {
      $body.addEventListener("click", (e) => {
        if (returnText(e) != "") {
          speak.text = returnText(e);
          if (speakerOnOff) {
            speechSynthesis.speak(speak);
          }
        }
      });

      $body.addEventListener("mouseout", () => {
        speechSynthesis.cancel();
      });
    } else {
      $body.addEventListener("mouseover", (e) => {
        if (returnText(e) != "") {
          speak.text = returnText(e);
          if (speakerOnOff) {
            speechSynthesis.speak(speak);
          }
        }
      });

      $body.addEventListener("mouseout", () => {
        speechSynthesis.cancel();
      });
    }

    $audioIMG.getAttribute("src") == `${direccion}/images/play.svg`
      ? ($audioIMG.src = `${direccion}/images/stop.svg`)
      : ($audioIMG.src = `${direccion}/images/play.svg`);
  }

  const googleTranslateElementInit = () => {
    new google.translate.TranslateElement(
      {
        pageLanguage: "es",
        includedLanguages:
          "ar,bg,de,el,en,es,fa,fr,hr,it,iw,ja,ko,la,nl,pl,pt,ru,tr,uk,zh-CN",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  //funcion para sonido

  const audios = {
    open: `${direccion}/sounds/open.mp3`,
    close: `${direccion}/sounds/close.mp3`,
  };

  const $audioContent = document.getElementById("mp3AC");

  function soundContent(option) {
    switch (option) {
      case "active":
        if ($screenreader.classList.contains("barraAccesibilidad--active")) {
          $audioContent.setAttribute("src", `${audios.close}`);
          $audioContent.play();
          if (speakerOnOff == true) {
            $audioContent.pause();
            $audioContent.currentTime = 0;
          }
        } else {
          $audioContent.setAttribute("src", `${audios.open}`);
          $audioContent.play();
          if (speakerOnOff == true) {
            $audioContent.pause();
            $audioContent.currentTime = 0;
          }
        }
        break;
      case "desactive":
        $audioContent.pause();
        $audioContent.currentTime = 0;
    }
  }

  document.addEventListener("mouseover", (e) => {
    if (e.target === $screenreaderLogo) soundContent("active");
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target === $screenreaderLogo) soundContent("desactive");
  });

  document.addEventListener("click", (e) => {
    if (e.target == $screenreaderLogo || e.target == $logoImg) activeMenu();

    if (e.target == $moreFont) changeSizeFont("more");

    if (e.target == $lessFont) changeSizeFont("less");

    if (e.target == $normalFont) changeSizeFont("normal");

    if (e.target == $moreSpacing) changeSpacing("more");

    if (e.target == $lessSpacing) changeSpacing("less");

    if (e.target == $contraste) $body.classList.toggle("scr_highcontrast");

    if (e.target == $dyslexic)
      $allFont2.forEach((el) => el.classList.toggle("font-dyslexic"));

    if (e.target == $hues) $body.classList.toggle("scr_grayHues");

    if (e.target == $cursor) $body.classList.toggle("scr_bigcursor");

    if (e.target == $highlight)
      $allLinks.forEach((el) => el.classList.toggle("src_highlightLink"));

    if (e.target == $audio) screenReader(!speakerOnOff);
  });

  document.addEventListener("keypress", (e) => {
    if (e.key == "enter" || e.keyCode == 13) {
      if (e.target == $screenreaderLogo || e.target == $logoImg) activeMenu();

      if (e.target == $moreFont) changeSizeFont("more");

      if (e.target == $lessFont) changeSizeFont("less");

      if (e.target == $normalFont) changeSizeFont("normal");

      if (e.target == $moreSpacing) changeSpacing("more");

      if (e.target == $lessSpacing) changeSpacing("less");

      if (e.target == $contraste) $body.classList.toggle("scr_highcontrast");

      if (e.target == $dyslexic)
        $allFont2.forEach((el) => el.classList.toggle("font-dyslexic"));

      if (e.target == $hues) $body.classList.toggle("scr_grayHues");

      if (e.target == $cursor) $body.classList.toggle("scr_bigcursor");

      if (e.target == $highlight)
        $allLinks.forEach((el) => el.classList.toggle("src_highlightLink"));

      if (e.target == $audio) screenReader(!speakerOnOff);
    }
  });
});
