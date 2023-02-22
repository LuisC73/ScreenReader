import data from "./data.js";

const design = () => {
  const $s4Workspace = document.getElementById("s4-workspace"),
    direccion = `/Style Library/ScreenReaderV3/Assets`;

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

  const optionsContainer = document.querySelector(".accessibilityBar__options");

  let fragmentContent = document.createDocumentFragment();

  for (const i in data) {
    let optionAc = document.createElement("div");

    optionAc.classList.add("accessibilityBar__option");
    optionAc.setAttribute("id", `${data[i].id}`);

    optionAc.innerHTML = `
      <strong class="accessibilityBar__icon accessibilityBar__icon--${data[i].img}"></strong>
      <p class="accessibilityBar__p" tabindex="0">${data[i].text}</p>`;

    if (i == 12) {
      optionAc.addEventListener("click", () => {
        window.open("https://centroderelevo.gov.co/632/w3-channel.html", '_blank');
      });
      optionAc.innerHTML = `  
          <strong class="accessibilityBar__icon accessibilityBar__icon--${data[i].img}"></strong>
          <a href="https://centroderelevo.gov.co/632/w3-channel.html" class="accessibilityBar__p" target="_blank"  tabindex="0">${data[i].text}</a>`;
    }

    if (i == 9) {
      optionAc.innerHTML = `
          <div id="google_translate_element"></div>
            <div class="accessibilityBar__translate">
              <div class="accessibilityBar__select">
                <strong class="accessibilityBar__icon accessibilityBar__icon--${data[i].img}"></strong>
                <p class="accessibilityBar__p" tabindex="0">${data[i].text}</p>
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
