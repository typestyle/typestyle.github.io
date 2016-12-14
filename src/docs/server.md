Sever side rendering + static page generations is supported with a super easy function. It may not be a feature you need so you can safely skip reading this section.

## `getStyles`
It allows you to get the styles as CSS which you can return as a part of your server response. e.g.

```ts
/** Import */
import {style, getStyles} from "typestyle";

/** convert a style object to a CSS class name */
const className = style({color: 'red'});

/** Render to CSS style tag */
const styleTag = `<style>${getStyles()}</style>`
/** ^ send this as a part of your HTML response */
```

Here is a more *fancy* example function that uses React: 

```ts
export const renderPage = ({ html, css }: { html: string, css: string }) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <style id="styles-target">
      ${css}
    </style>
</head>
<body>
  <div id="root">${html}</div>
  <script src="./bundle.js"></script>
</body>
</html>
`;

import {getStyles} from "typestyle";
import {App} from "./yourApp";

const response = renderPage({ 
  html: ReactDOMServer.renderToString(<App/>), 
  css: getStyles()
});

/** ^ send this as your HTML response */
```

Then in the frontend you simply use the same style tag after rendering the html: 

```ts
import {setStylesTarget} from "typestyle";
ReactDOM.render(<App/>, document.getElementById('root'));
setStylesTarget(document.getElementById('styles-target'));
```