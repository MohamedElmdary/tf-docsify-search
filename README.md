# TF Search Plugin

### Usage
```html
<script src="https://cdn.jsdelivr.net/gh/MohamedElmdary/tf-docsify-search@master/dist/index.js"></script>
<script>
    window.$docsify = {
        plugins: [
            tfSearchPlugin({ /* configs */ })
        ]
    }
</script>
```

### Configs
```ts
interface IConfigs {
  colors?: IColors;
  texts?: ITexts;
  fontFamily?: string; // "sans-serif"
}

interface IColors {
  button: string; // "#333"
  buttonBackground: string; // "#00d1b2"
  input: string; // "#333"
  background: string; // "white"
}

interface ITexts {
  placeholder: string; // "Type something"
  button: string; // "Search"
}
```
