Sever side rendering + static page generations is supported with a super easy function. It may not be a feature you need so you can safely skip reading this section.

## `getCss`
It allows you to get the styles as CSS which you can return as a part of your server response. e.g.

```ts
/** Import */
import {style, getCss} from "typestyle";

/** convert a style object to a CSS class name */
const className = style({color: 'red'});

/** Render to CSS style tag */
const styleTag = `<style>${getCss()}</style>`
/** ^ send this as a part of your HTML response */
```

Here is a more *fancy* example function that uses React: 

```ts
export const renderPage = ({ html, css }: { html: string, css: string }) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <style id="css-target">
      ${css}
    </style>
</head>
<body>
  <div id="root">${html}</div>
  <script src="./bundle.js"></script>
</body>
</html>
`;

import {getCss} from "typestyle";
import {App} from "./yourApp";

const response = renderPage({ 
  html: ReactDOMServer.renderToString(<App/>), 
  css: getCss()
});

/** ^ send this as your HTML response */
```

Then in the frontend you simply use the same style tag after rendering the html: 

```ts
import {setCssTarget} from "typestyle";
ReactDOM.render(<App/>, document.getElementById('root'));
setCssTarget(document.getElementById('css-target'));
```