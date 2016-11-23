Sever side rendering + static page generations is supported with a super easy function.

## `css`
It allows you to get the styles as CSS which you can return as a part of your server response. e.g.

```ts
/** Import */
import {style, css} from "typestyle";

/** convert a style object to a CSS class name */
const className = style({color: 'red'});

/** Render to CSS style tag */
const styleTag = `<style>${css()}</style>`
/** ^ send this as a part of your HTML response */
```