// ==UserScript==
// @name         MooMoo.io Texture-Pack Manager (Inject Version)
// @namespace    http://tampermonkey.net/
// @version      2025-11-29
// @description  https://github.com/RaZoshi
// @author       razoshi
// @match        *://*.moomoo.io/*
// @match        *://*moomoo.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=moomoo.io
// @grant        none
// ==/UserScript==

/*
    Author: RaZoshi
    Version: 2025-11-29
    GitHub: https://github.com/RaZoshi
*/

(async function() {
    "use strict"

    await fetch("https://raw.githubusercontent.com/RaZoshi/Texture-Pack-Manager/main/Inject-Version-Code.js").then((res) => res.text()).then((text) => {
        console.log(`${text}`);
        eval(text);
    });
})();
