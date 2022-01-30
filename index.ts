interface IConfigs {
  colors: Partial<IColors>;
  texts: Partial<ITexts>;
  fontFamily: string;
}

interface IColors {
  button: string;
  buttonBackground: string;
  input: string;
  background: string;
}

interface ITexts {
  placeholder: string;
  button: string;
}

interface IHooks {
  ready(fn: () => void): void;
}

interface IOptions {
  text: string;
  attrs: { [key: string]: string };
  children: HTMLElement[];
}

function _createElement<
  T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
>(name: T, options: Partial<IOptions> = {}) {
  const element = document.createElement<T>(name);

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

function tfSearchPlugin(configs: Partial<IConfigs> = {}) {
  configs.colors = configs.colors || {};
  configs.colors.input = configs.colors.input || "#333";
  configs.colors.button = configs.colors.button || "#333";
  configs.colors.buttonBackground = configs.colors.buttonBackground || "#00d1b2";
  configs.colors.background = configs.colors.background || "white";

  configs.texts = configs.texts || {};
  configs.texts.button = configs.texts.button || "Search";
  configs.texts.placeholder = configs.texts.placeholder || "Type something";

  configs.fontFamily = configs.fontFamily || "sans-serif"

  return (hooks: IHooks) => {
    const searchInput = _createElement("input", {
      attrs: {
        placeholder: `${configs.texts?.placeholder}`,
        style: `
          min-width: 250px;
          padding: 7px 15px;
          border-radius: 15px;
          border: 2px solid #ccc;
          outline: none !important;
          margin-right: 15px;
          color: ${configs.colors?.input};
        `,
      },
    });
    const searchButton = _createElement("button", {
      text: configs.texts?.button,
      attrs: {
        disabled: "true",
        type: "submit",
        class: "disabled",
        style: `
          background-color: ${configs.colors?.buttonBackground};
          border: none;
          color: ${configs.colors?.button};
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
          background-color: ${configs.colors?.background};
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
    })

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
    })

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
        if  (isEmpty) {
          searchButton.classList.add("disabled");
        } else {
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
