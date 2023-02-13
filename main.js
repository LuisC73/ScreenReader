import design from "/Style Library/ScreenReaderV3/design.js";

window.addEventListener("DOMContentLoaded", () => {
  //insertar barra lateral al html
  design();

  //variable para cambiar dirección donde se encuentran ubicados los archivos de la barra de accesibilidad.
  const direccion = `/Style Library/ScreenReaderV3`;

  /* Elementos del Dom para el funcionamiento de la barra, ademas de la
    seleccion de todas las letras. */
  const $audio = document.getElementById("narratorAc"),
    $audioIMG = document.querySelector(".accessibilityBar__icon--play"),
    $moreFont = document.getElementById("moreSizeAc"),
    $lessFont = document.getElementById("lessSizeAc"),
    $normalFont = document.getElementById("restartAc"),
    $dyslexic = document.getElementById("dyslexicAc"),
    $hues = document.getElementById("grayAc"),
    $cursor = document.getElementById("cursorAc"),
    $contraste = document.getElementById("contrastAc"),
    $highlight = document.getElementById("linksAc"),
    $moreSpacing = document.getElementById("moreSpacingAc"),
    $lessSpacing = document.getElementById("lessSpacingAc"),
    $screenreaderLogo = document.querySelector(".accessibilityBar__figure"),
    $logoImg = document.querySelector(".accessibilityBar__logo"),
    $screenreader = document.querySelector(".accessibilityBar"),
    $body = document.querySelector("body"),
    $allFont = document.querySelectorAll(
      "span, p, a, h1, h2, h3, h4, h5, input, div, .titulos,.titulo,#testimonios > .card-title, .evento-fecha-2,button,strong,td,.w3layouts_event_grid,.nav-link"
    ),
    $allFont2 = document.querySelectorAll(
      "p, a, h1, h2, h3, h4, h5, input, div, .titulos, #testimonios > .card-title, .evento-fecha-2,button, .w3layouts_event_grid,.titulo,.nav-link"
    ),
    $itemsMenu = document.querySelectorAll(".accessibilityBar__option"),
    $allLinks = document.querySelectorAll("a");

  // Se inicializa el narrador, el array donde guardamos el tamaño de letra de cada texto en la pagina web.
  let speakerOnOff = false,
    speak = new SpeechSynthesisUtterance(),
    arrayFont = [],
    spacing = 1;

  //Funcion para la activacion del menu y animacion de opciones en barra de accesibilidad.
  function activeMenu() {
    $screenreader.classList.toggle("accessibilityBar--active");
    $itemsMenu.forEach((item, index) => {
      item.style.animation
        ? (item.style.animation = "")
        : (item.style.animation = `itemFade .5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  //Funcion para cambiar el tamaño de letra, es decir aumentarla o disminuirla,Ademas de tener la opción resetearla.
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
        // translateLanguage("español");
      } else {
        el.style.fontSize = `${fontSize}px`;
      }
    });
  }

  //Funcion para cambiar el espaciado del texto.
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
      returnTag(e) == "LABEL" ||
      returnTag(e) == "TD" ||
      returnTag(e) == "B"
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

  //Funcion de narrador para leer texto de pagina web al hacer el evento hover.
  function screenReader(value) {
    let mediaQuery = window.matchMedia("(max-width: 800px)");

    speakerOnOff = value;

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

    // Dependiendo del estado del narrador se cambiara su icono para indicar si esta activo o inactivo
    if (speakerOnOff === true) {
      $audioIMG.classList.remove("accessibilityBar__icon--play");
      $audioIMG.classList.add("accessibilityBar__icon--stop");
    } else {
      $audioIMG.classList.add("accessibilityBar__icon--play");
      $audioIMG.classList.remove("accessibilityBar__icon--stop");
    }
  }

  //Funcion para activar o desactivar narrador en evento click
  function screenReaderClick(value) {
    speakerOnOff = value;
    speak.lang = "es-ES";
    speak.rate = 1.3;
    sessionStorage.setItem("valueNarrador", speakerOnOff);

    screenReader(speakerOnOff);
  }

  //Funcion para sonido de abrir o cerrar barra de accesibilidad en evento hover al logo.
  const audios = {
    open: `${direccion}/sounds/open.mp3`,
    close: `${direccion}/sounds/close.mp3`,
  };

  const $audioContent = document.getElementById("mp3AC");

  function soundContent(option) {
    switch (option) {
      case "active":
        if (speakerOnOff == true) {
          $audioContent.pause();
          $audioContent.currentTime = 0;
        } else {
          if ($screenreader.classList.contains("accessibilityBar--active")) {
            $audioContent.setAttribute("src", `${audios.close}`);
            $audioContent.play();
          } else {
            $audioContent.setAttribute("src", `${audios.open}`);
            $audioContent.play();
          }
        }
        break;
      case "desactive":
        $audioContent.pause();
        $audioContent.currentTime = 0;
        break;
    }
  }

  //Funcion para guardar valor de narrador, es decir si esta activo o no, para no volver a activarlo en una pagina interna.
  (function screenReaderAuto() {
    let value = sessionStorage.getItem("valueNarrador");

    value == "true" ? (speakerOnOff = true) : (speakerOnOff = false);

    screenReader(speakerOnOff);

    if (speakerOnOff == true) {
      $audioContent.pause();
      $audioContent.currentTime = 0;
    }
  })();

  // funcion de traductor, seleccionamos los elementos del traductor
  const $btnTranslate = document.querySelector(".accessibilityBar__select"),
    $translateOptions = document.querySelector(".translateAc"),
    $optionsTranslate = document.querySelectorAll(".translateAc__a");

  //Seleccionamos el contenedor de los idiomas y apartir de la seleccion del usuario se enviara el valor y se eligira el idioma correcto en el traductor de google,
  // en caso de que no se logre seleccionar el contenedor de idiomas por defecto de google, validar si contiene la misma clase que la seleccionda en este momento,
  function translateLanguage(lang) {
    let $frame = $(".VIpgJd-ZVi9od-xl07Ob-OEVmcd.skiptranslate:first");

    $frame
      .contents()
      .find(`.VIpgJd-ZVi9od-vH1Gmf-ibnC6b span.text:contains(${lang})`)
      .get(0)
      .click();
    return false;
  }

  $optionsTranslate.forEach((el) => {
    el.addEventListener("click", () => {
      let lang = el.getAttribute("data-lang");
      translateLanguage(lang);
    });
  });

  //Delegacion de eventos.
  document.addEventListener("mouseover", (e) => {
    if (e.target === $screenreaderLogo || e.target == $logoImg)
      soundContent("active");
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target === $screenreaderLogo || e.target == $logoImg)
      soundContent("desactive");
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

    if (e.target == $audio) screenReaderClick(!speakerOnOff);

    if (e.target === $btnTranslate || e.target === `${$btnTranslate} > *`) {
      $translateOptions.classList.toggle("translateAc--active");
    } else {
      $translateOptions.classList.remove("translateAc--active");
    }
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

      if (e.target == $audio) screenReaderClick(!speakerOnOff);

      if (e.target == $btnTranslate)
        $translateOptions.classList.toggle("translateAc--active");
    }
  });
});
