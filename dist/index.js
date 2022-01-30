"use strict";
function _createElement(name, options = {}) {
    const element = document.createElement(name);
    if (options.text) {
        element.textContent = options.text;
    }
    if (options.attrs) {
        for (const attr in options.attrs) {
            const value = options.attrs[attr];
            element.setAttribute(attr, value);
        }
    }
    if (options.children) {
        for (const child of options.children) {
            element.appendChild(child);
        }
    }
    return element;
}
function tfSearchPlugin(configs = {}) {
    configs.colors = configs.colors || {};
    configs.colors.input = configs.colors.input || "#333";
    configs.colors.button = configs.colors.button || "#333";
    configs.colors.buttonBackground = configs.colors.buttonBackground || "#00d1b2";
    configs.colors.background = configs.colors.background || "white";
    configs.texts = configs.texts || {};
    configs.texts.button = configs.texts.button || "Search";
    configs.texts.placeholder = configs.texts.placeholder || "Type something";
    configs.fontFamily = configs.fontFamily || "sans-serif";
    return (hooks) => {
        var _a, _b, _c, _d, _e, _f;
        const searchInput = _createElement("input", {
            attrs: {
                placeholder: `${(_a = configs.texts) === null || _a === void 0 ? void 0 : _a.placeholder}`,
                style: `
          min-width: 250px;
          padding: 7px 15px;
          border-radius: 15px;
          border: 2px solid #ccc;
          outline: none !important;
          margin-right: 15px;
          color: ${(_b = configs.colors) === null || _b === void 0 ? void 0 : _b.input};
        `,
            },
        });
        const searchButton = _createElement("button", {
            text: (_c = configs.texts) === null || _c === void 0 ? void 0 : _c.button,
            attrs: {
                disabled: "true",
                type: "submit",
                class: "disabled",
                style: `
          background-color: ${(_d = configs.colors) === null || _d === void 0 ? void 0 : _d.buttonBackground};
          border: none;
          color: ${(_e = configs.colors) === null || _e === void 0 ? void 0 : _e.button};
          padding: 7px 15px;
          border-radius: 15px;
          cursor: pointer;
        `
            }
        });
        const searchContainer = _createElement("form", {
            children: [searchInput, searchButton],
            attrs: {
                style: `
          margin-top: 25px;
        `,
            },
        });
        const searchArea = _createElement("div", {
            attrs: {
                class: "closed",
                style: `
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100%;
          background-color: ${(_f = configs.colors) === null || _f === void 0 ? void 0 : _f.background};
          display: flex;
          justify-content: center;
          z-index: 999
        `,
            },
            children: [searchContainer],
        });
        const globalStyle = _createElement("style", {
            text: `
        .disabled {
          cursor: initial !important;
          background-color: #ccc !important;
        }

        .closed {
          visibility: hidden !important;
          opacity: 0 !important;
          event-pointer: none !important;
          display: none !important;
        }
      `
        });
        const searchAreaButton = _createElement("button", {
            text: 'X',
            attrs: {
                style: `
          position: fixed;
          top: 15px;
          right: 15px;
          border: none;
          z-index: 1000;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          border: 1px solid #ccc;
        `
            }
        });
        const searchPluginHTML = _createElement("div", {
            attrs: {
                style: `
          font-family: ${configs.fontFamily};
        `
            },
            children: [globalStyle, searchAreaButton, searchArea]
        });
        hooks.ready(() => {
            document.body.appendChild(searchPluginHTML);
            searchAreaButton.addEventListener('click', () => {
                searchArea.classList.toggle("closed");
                if (!searchArea.classList.contains("closed")) {
                    searchInput.focus();
                }
            });
            searchInput.addEventListener("input", () => {
                const isEmpty = searchInput.value.trim() === "";
                searchButton.disabled = isEmpty;
                if (isEmpty) {
                    searchButton.classList.add("disabled");
                }
                else {
                    searchButton.classList.remove("disabled");
                }
            });
            searchContainer.addEventListener("submit", (e) => {
                e.preventDefault();
                console.log(searchInput.value);
            });
        });
    };
}
