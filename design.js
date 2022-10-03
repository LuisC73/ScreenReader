const design = () => {
  //insertar barra lateral al html
  let accesibilidadHtml = document.createElement("div");
  accesibilidadHtml.classList.add("barraAccesibilidad");
  accesibilidadHtml.setAttribute("tabindex", "0");
  // Contenedor padre donde se insertara, ademas de la direccion donde se encuentran
  // ubicadas las diferentes imagenes.
  const $s4Workspace = document.getElementById("s4-workspace"),
    direccion = `/Style Library/ScreenReaderV3`;

  accesibilidadHtml.innerHTML = `
      <figure class="barraAccesibilidad__logo" tabindex="0">
          <img src="${direccion}/images/logo.svg" alt="logo" class="barraAccesibilidad__lg" title="Accesibilidad" tabindex="0">
      </figure>
        <div class="barraAccesibilidad__content" tabindex="0">
        <h3 class="barraAccesibilidad__title">Accesibilidad</h3>
        <div class="barraAccesibilidad__options">
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/play.svg" alt="Narrador" class="barraAccesibilidad__img" id="narradorIMG">
            <p class="barraAccesibilidad__p" id="narradorAC"  tabindex="0">Narrador</p>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/more_size.svg" alt="Aumentar letra"
              class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="aumentarAC" tabindex="0">Aumentar texto</p>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/less_size.svg" alt="Disminuir letra"
              class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="disminuirAC" tabindex="0">Disminuir texto</p>
          </div>
          <div class="barraAccesibilidad__option">
          <img src="${direccion}/images/more_spacing.svg" alt="Aumentar Espacio"
            class="barraAccesibilidad__img">
          <p class="barraAccesibilidad__p" id="espaciadoAC"  tabindex="0">Aumentar espaciado</p>
        </div>
        <div class="barraAccesibilidad__option">
          <img src="${direccion}/images/less_spacing.svg" alt="Disminuir Espacio"
            class="barraAccesibilidad__img">
          <p class="barraAccesibilidad__p" id="disminuirEspaciadoAC" tabindex="0">Disminuir espaciado</p>
        </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/bar_gray.svg" alt="Escala de grises"
              class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="tonoAC"  tabindex="0">Escala de grises</p>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/contrast.svg" alt="Alto contraste"
              class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="contrasteAC" tabindex="0">Alto contraste</p>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/dyslexic.svg" alt="Fuente dislexicos"
              class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="dislexicosAC" tabindex="0">Fuente dislexicos</p>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/cursor.svg" alt="Aumentar cursor"
              class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="cursorAC" tabindex="0">Aumentar cursor</p>
          </div>
          <div class="barraAccesibilidad__option">
            <a href="#" class="barraAccesibilidad__traductor" aria-label="idioma">
                <div class="barraAccesibilidad__traductorDiv">
                    <div id="google_translate_element"></div>
                </div>
            </a>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/link.svg" alt="Resaltar Enlaces"
              class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="resaltarAC" tabindex="0">Resaltar enlaces</p>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/restart.svg" alt="Restablecer" class="barraAccesibilidad__img">
            <p class="barraAccesibilidad__p" id="reiniciarAC" tabindex="0">Restablecer</p>
          </div>
          <div class="barraAccesibilidad__option">
            <img src="${direccion}/images/centro_relevo.svg" alt="Centro de relevo"
              class="barraAccesibilidad__img">
            <a href="https://centroderelevo.gov.co/632/w3-channel.html" class="barraAccesibilidad__p" target="_blank" id="centroRelevo"  tabindex="0">Centro de
              relevo
            </a>
          </div>
        </div>
      </div>

      <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" defer></script>
`;

  $s4Workspace.append(accesibilidadHtml);

};


export default design;