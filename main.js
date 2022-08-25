window.addEventListener('DOMContentLoaded', () => {
  //insertar contenido
  let accesibilidadHtml = document.createElement('div');
  accesibilidadHtml.classList.add('barraAccesibilidad')

  const $s4Workspace = document.getElementById('s4-workspace')

  let direccion = `/Style Library/ScreenReaderV3`

  accesibilidadHtml.innerHTML = `
          <div class="barraAccesibilidad__content">
          <h3 class="barraAccesibilidad__title">Accesibilidad</h3>
          <div class="barraAccesibilidad__options">
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/play.svg" alt="Narrador" class="barraAccesibilidad__img" id="narradorIMG">
              <p class="barraAccesibilidad__p" id="narradorAC">Narrador</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/more_size.svg" alt="Aumentar letra"
                class="barraAccesibilidad__img">
              <p class="barraAccesibilidad__p" id="aumentarAC">Aumentar Texto</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/less_size.svg" alt="Disminuir letra"
                class="barraAccesibilidad__img">
              <p class="barraAccesibilidad__p" id="disminuirAC">Disminuir Texto</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/bar_gray.svg" alt="Escala de grises"
                class="barraAccesibilidad__img">
              <p class="barraAccesibilidad__p" id="tonoAC">Escala de grises</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/contrast.svg" alt="Alto contraste"
                class="barraAccesibilidad__img">
              <p class="barraAccesibilidad__p" id="contrasteAC">Alto contraste</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/dyslexic.svg" alt="Fuente dislexicos"
                class="barraAccesibilidad__img">
              <p class="barraAccesibilidad__p" id="dislexicosAC">Fuente dislexicos</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/cursor.svg" alt="Aumentar cursor"
                class="barraAccesibilidad__img">
              <p class="barraAccesibilidad__p" id="cursorAC">Aumentar cursor</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/restart.svg" alt="Resetear" class="barraAccesibilidad__img">
              <p class="barraAccesibilidad__p" id="reiniciarAC">Resetear</p>
            </div>
            <div class="barraAccesibilidad__option" tabindex="1">
              <img src="${direccion}/imagenes/centro_relevo.svg" alt="Centro de relevo"
                class="barraAccesibilidad__img">
              <a href="https://centroderelevo.gov.co/632/w3-channel.html" class="barraAccesibilidad__p" target="_blank" id="centroRelevo">Centro de
                relevo
              </a>
            </div>
          </div>
        </div>
        <figure class="barraAccesibilidad__logo" tabindex="1">
          <img src="${direccion}/imagenes/logo.svg" alt="logo" class="barraAccesibilidad__lg">
        </figure>
  `

  $s4Workspace.append(accesibilidadHtml)

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
    $logoImg = document.querySelector('.barraAccesibilidad__lg'),
    $screenreader = document.querySelector('.barraAccesibilidad'),
    $body = document.querySelector("body"),
    $allFont = document.querySelectorAll(
      "span, p, a, h1, h2, h3, h4, h5, input, div, .titulos, #testimonios > .card-title, .evento-fecha-2,button,strong,td"
    ),
    $allFont2 = document.querySelectorAll(
      "p, a, h1, h2, h3, h4, h5, input, div, .titulos, #testimonios > .card-title, .evento-fecha-2,button, .w3layouts_event_grid"
    );

  let speakerOnOff = false;
  let speak = new SpeechSynthesisUtterance();
  let volume = 1;
  speak.volume = volume;


  function changeSizeFont(type) {
    $allFont.forEach((el,i) => {
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
        el.style.fontSize = `${15}px`  
        if(el.classList.contains("modal__p")) $allFont[i].style.fontSize = 1 + "rem"
        if(el.classList.contains("header__title")) $allFont[i].style.fontSize = 20 + "px"
        if(el.classList.contains("footer__p")) $allFont[i].style.fontSize = 1.3 + "rem"
        if(el.classList.contains("titulos") || el.classList.contains("titulos1")) $allFont[i].style.fontSize = 24 + "px"
        if (el.classList.contains("font-dyslexic")) el.classList.toggle("font-dyslexic")
        if ($body.classList.contains('scr_highcontrast')) $body.classList.toggle('scr_highcontrast')
        if ($body.classList.contains('scr_grayHues')) $body.classList.toggle('scr_grayHues')
        if ($body.classList.contains('scr_bigcursor')) $body.classList.toggle('scr_bigcursor')
      }
    });
  }

  function addClass(nameClass, button) {
    document.addEventListener("click", (e) => {
      if (e.target == button) $body.classList.toggle(nameClass);
    });
  }

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

  document.addEventListener('click', (e) => {
    if (e.target == $screenreaderLogo || e.target == $logoImg) $screenreader.classList.toggle('barraAccesibilidad--active');

    if (e.target == $moreFont) changeSizeFont("more");

    if (e.target == $lessFont) changeSizeFont("less");

    if (e.target == $normalFont) changeSizeFont("normal");

    if (e.target == $contraste) addClass("scr_highcontrast", $contraste);

    if (e.target == $dyslexic) $allFont2.forEach((el) => el.classList.toggle("font-dyslexic"));

    if (e.target == $hues) addClass("scr_grayHues", $hues);

    if (e.target == $cursor) addClass("scr_bigcursor", $cursor);

    if (e.target == $audio) {
      speakerOnOff = !speakerOnOff;
      $audioIMG.getAttribute("src") == "/Style Library/ScreenReaderV3/imagenes/play.svg" ?
        ($audioIMG.src = "/Style Library/ScreenReaderV3/imagenes/stop.svg") :
        ($audioIMG.src = "/Style Library/ScreenReaderV3/imagenes/play.svg");
    }
  })
})