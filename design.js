const design = () => {
  const $s4Workspace = document.getElementById("s4-workspace"),
    direccion = `/Style Library/ScreenReaderV3`;

  const accessibilityContainer = document.createElement("div");

  accessibilityContainer.classList.add("accessibilityBar");
  accessibilityContainer.setAttribute("tabindex", "0");

  accessibilityContainer.innerHTML = `
  <figure class="accessibilityBar__figure" tabindex="0">
    <img src="${direccion}/images/logo.svg" alt="logo" class="accessibilityBar__logo" title="Accesibilidad" tabindex="0">
  </figure>
  <div class="accessibilityBar__content" tabindex="0">
    <h3 class="accessibilityBar__title">Accesibilidad</h3>
    <div class="accessibilityBar__options">
      <audio src="#" id="mp3AC" class="accessibilityBar__audio"></audio>
    </div>
   </div> 
  `;

  $s4Workspace.append(accessibilityContainer);

  const data = [
    {
      text: "Narrador",
      img: "play",
      id: "narratorAc",
    },
    {
      text: "Aumentar texto",
      img: "maximize",
      id: "moreSizeAc",
    },
    {
      text: "Disminuir texto",
      img: "minimize",
      id: "lessSizeAc",
    },
    {
      text: "Aumentar espaciado",
      img: "more_spacing",
      id: "moreSpacingAc",
    },
    {
      text: "Disminuir espaciado",
      img: "less_spacing",
      id: "lessSpacingAc",
    },
    {
      text: "Escala de grises",
      img: "bar_gray",
      id: "grayAc",
    },
    {
      text: "Alto contraste",
      img: "contrast",
      id: "contrastAc",
    },
    {
      text: "Fuente dislexicos",
      img: "dyslexic",
      id: "dyslexicAc",
    },
    {
      text: "Aumentar cursor",
      img: "cursor",
      id: "cursorAc",
    },
    {
      text: "Seleccionar Idioma",
      img: "translate",
      id: "translateAc",
    },
    {
      text: "Resaltar enlaces",
      img: "link",
      id: "linksAc",
    },
    {
      text: "Restablecer",
      img: "restart",
      id: "restartAc",
    },
    {
      text: "Centro de relevo",
      img: "centro_relevo",
      id: "relevoAc",
    },
  ];

  const optionsContainer = document.querySelector(".accessibilityBar__options");

  let fragmentContent = document.createDocumentFragment();

  for (const i in data) {
    let optionAc = document.createElement("div");

    optionAc.classList.add("accessibilityBar__option");

    optionAc.innerHTML = `
      <strong class="accessibilityBar__icon accessibilityBar__icon--${data[i].img}"></strong>
      <p class="accessibilityBar__p" id="${data[i].id}" tabindex="0">${data[i].text}</p>`;

    if (i == 12) {
      optionAc.innerHTML = `  
          <strong class="accessibilityBar__icon accessibilityBar__icon--${data[i].img}"></strong>
          <a href="https://centroderelevo.gov.co/632/w3-channel.html" class="accessibilityBar__p" target="_blank" id="${data[i].id}" tabindex="0">${data[i].text}</a>`;
    }

    if (i == 9) {
      optionAc.innerHTML = `
          <div id="google_translate_element"></div>
            <div class="accessibilityBar__translate">
              <div class="accessibilityBar__select">
                <strong class="accessibilityBar__icon accessibilityBar__icon--${data[i].img}"></strong>
                <p class="accessibilityBar__p" id="${data[i].id}" tabindex="0">${data[i].text}</p>
              </div>
              <div class="translateAc">
                <p class="translateAc__p">Cambiar idioma del sitio:</p>
                <ul class="translateAc__ul">
                  <li class="translateAc__li" id="español">
                    <a href="javascript:;" data-lang="español" class="translateAc__a" title="español"></a>
                  </li>
                  <li class="translateAc__li" id="inglés">
                    <a href="javascript:;" data-lang="inglés" class="translateAc__a" title="inglés"></a>
                  </li>
                  <li class="translateAc__li" id="portugués">
                    <a href="javascript:;" data-lang="portugués" class="translateAc__a" title="portugués"></a>
                  </li>
                  <li class="translateAc__li" id="japonés">
                    <a href="javascript:;" data-lang="japonés" class="translateAc__a" title="japonés"></a>
                  </li>
                  <li class="translateAc__li" id="italiano">
                    <a href="javascript:;" data-lang="italiano" class="translateAc__a" title="italiano"></a>
                  </li>
                </ul>
              </div>
            </div>`;
    }
    fragmentContent.appendChild(optionAc);
  }
  optionsContainer.appendChild(fragmentContent);
};

export default design;
