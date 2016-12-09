* [cssRule](/#/raw/-cssrule-)
* [cssRaw](/#/raw/-cssraw-)
* [Advantages of these functions over loaders](/#/raw/advantages-of-these-functions-over-loaders)

We understand that just classes are not sufficient for a full CSS in JS story as the generated dom is not always coming from your library, or in your control.

For those scenarios we have two functions 

## `cssRule`

You can even use any raw CSS selector as well using `cssRule` e.g.

* To setup a application style layout:

```ts
/** Use full window size for application */
cssRule('html, body', {
  height: '100%',
  width: '100%',
  padding: 0,
  margin: 0
});
```

* Font faces:

```ts
cssRule('@font-face', {
  fontFamily: '"Bitstream Vera Serif Bold"',
  src: 'url("https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf")'
});
```

* Page level media queries:

```ts
/** Save ink with a white background */
cssRule('@media print', {
  body: {
    background: 'white'
  }
});
```

## `cssRaw` 

Sometimes someone just hands you are raw CSS file and you can't be bothered to make it into objects. An excellent use case is using something like `normalize.css`.

```ts
import {cssRaw} from "typestyle"

/** Sample rule from normalize.css */
cssRaw(`
/**
 * Correct the font size and margin on h1 elements within section and
 * article contexts in Chrome, Firefox, and Safari.
 */
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
`)
```

> Protip `csstips.normalize()` uses this function internally to actually add `normalize.css`. More on this later.

## Advantages of these functions over loaders 

* Works seemlessly in a nodejs enviroment (example use cases are nodejs testing / server side rendering) whereas `require('./someCss.css')` does not without additional setup.
* You still get to use JS and share variables with JS (using template strings!).
* With `cssRule` you can also use all our (and your!) fancy mixins.

Great. That covers the key TypeStyle API surface.