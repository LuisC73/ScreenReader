
<h1 align="center">💻 ScreenReader ✌</h1>

![barra](https://user-images.githubusercontent.com/80079884/215129994-e49931a3-8b85-48f2-8f14-f13f64deb15e.gif)

### Herramientas Utilizadas

- [Html]
- [Css]
- [JavaScript]
- [SpeechSynthesisUtterance]

### Sobre el proyecto

- Barra de accesibilidad realizada para mejorar los niveles de accesibilidad en los portales web, la cual fue diseñada con css y javascript y que permite las siguientes funcionalidades:

    * Aumentar tamaño de letra <br>
    * Disminuir tamaño de letra <br>
    * Aplicar fuente para dislexicos <br>
    * Aplicar tono gris <br>
    * Aumentar tamaño de cursor <br>
    * Aplicar contraste <br>
    * Aumentar espaciado de letras <br>
    * Resaltar enlaces <br>
    * Traductor de Google <br>
    * Resetear cambios


## Como instalarlo

```bash
# Clonar o descargar el repositorio
$ git clone https://github.com/LuisC73/ScreenReader.git

# Cambiar nombre de carpeta a ScreenReaderV3

# Pegar la carpeta en Style Library

```

```javascript
// Pegar script 
<script src="/Style Library/ScreenReaderV3/main.js" type="module"></script>

//Traductor, se deben implementar estos scripts para funcionamiento del traductor
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: "es",
        includedLanguages: "en,es,pt,ja,it",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  }
</script>

<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" defer></script>
```

```css
/* Pegar Hoja de estilos */
<link rel="stylesheet" href="/Style Library/ScreenReaderV3/style.css">

```
## Autor

* Luis Miguel Castro

