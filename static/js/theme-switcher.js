// variable declaration

const SELECTOR_ID = 'themes-selector'; // the switcher is a select HTML element

const THEME_COOKIE_NAME = "theme";

const THEME_CSS_ID = "theme-css"; // id of the link HTML element

const THEME_PATH = "/styles/themes/";

let themeSelector;
let linkTheme;


// functions

/**
 * Snippet found here : https://stackoverflow.com/a/21477063
 *
 * Not sure if it's the best way to do it, but it works and I don't think there is any major problem with it.
 *
 * @param url
 * @returns {boolean}
 */
function checkFileExist(url)
{
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

/**
 *
 * @param theme: string Name of the theme. If the corresponding theme isn't found, this function won't attempt
 * to change the theme.
 */
function setTheme(theme) {

  if (!checkFileExist(THEME_PATH + theme + '.css')) {
    console.log("Error: theme '" + theme + "' not found");
    return;
  }

  linkTheme.href = THEME_PATH + theme + '.css';
  themeSelector.value = theme;

  let storage = window.localStorage;
  storage.setItem(THEME_COOKIE_NAME, theme);
}

/**
 *
 */
function setStyleFromCookie() {

  let storage = window.localStorage;

  let stored_theme = storage.getItem(THEME_COOKIE_NAME);
  console.log(stored_theme);

  if (stored_theme === null)
    return;

  setTheme(stored_theme);
}

function setStyleFromSwitcher() {
  console.log('theme changed');
  setTheme(themeSelector.value);
}


function init() {


  themeSelector = document.getElementById(SELECTOR_ID);
  linkTheme = document.getElementById(THEME_CSS_ID);

  themeSelector.addEventListener("change", setStyleFromSwitcher);

  setStyleFromCookie();
  console.log('Theme switcher launched');
}

// Done when script is run

// catching DOMContentLoaded may not be the best practice but this script is small so it should be okay
document.addEventListener("DOMContentLoaded", init);
