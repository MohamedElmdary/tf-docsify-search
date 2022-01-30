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
        type: "submit",
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
        style: `
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100%;
          background-color: ${configs.colors?.background};
          display: flex;
          justify-content: center;
        `,
      },
      children: [searchContainer],
    });

    const searchPluginHTML = _createElement("div", {
      attrs: {
        style: `
          font-family: ${configs.fontFamily};
        `
      },
      children: [searchArea]
    })

    hooks.ready(() => {
      document.body.appendChild(searchPluginHTML);
      searchInput.focus();

      searchContainer.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(searchInput.value);
      });
    });
  };
}
