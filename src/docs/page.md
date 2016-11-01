There are very few simple things about the default layout of an HTML page that need to be setup in order to prepare it for the application development era:

* Full Sized Body
* Box Model

### Full Sized Body
You really want the root of your page to be something that takes up all the available space on screen and provides it as a drawing canvas for children. This can be done easily:

```css
html, body {
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0px;
}
```

### Box Model
You really want the `width`/`height` of an element to represent the `border+padding+content`. This is shown below:

![](https://raw.githubusercontent.com/typestyle/typestyle.github.io/source/images/book/borderbox.png)

It sounds something basic but the first HTML spec got wrong. Its easy to fix though:

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

### Root
Finally with modern web frameworks you normally render to some container div. e.g. `root` in the following example:

```html
<html>
<body>
  <div id="root"></div>
  <script src="./build/bundle.js"></script>
</body>
</html>
```

You probably want `#root` to be the same size as the body. Easily done by making its width / height `100%`.

### `setupPage`
Combine all that we've talked about and we have the following page setup.

```html
<html>
<body>
  <div id="root"></div>
  <script src="./build/bundle.js"></script>
</body>
</html>
```

```ts
import {setupPage} from "typestyle/csx";
setupPage('#root');
```

* sets up box model
* sets up `html/body` size
* sets up root component size

Easy as :)

### `normalize`
Browsers have different default styles for a few a the native tags e.g. the `template` tag *does not have `display: none` in IE but has it in all other browers. The list of such quirks is small but not something that you should bother with. This is why [normalize.css] exists. It is used by all the popular css frameworks including bootstrap. So a good idea to include in your own designs as well. Super simple with `csx/normalize` ;)

```ts
import {normalize} from "typestyle/csx";
normalize();

// Yay. Browser quirks ironed out
```

### Recommended page setup

Hence the recommended page setup

```html
<html>
<head>
  <meta name="viewport" content="width=device-width">
</head>
<body>
  <div id="root"></div>
  <script src="./build/bundle.js"></script>
</body>
</html>
```

```ts
import {normalize, setupPage} from "typestyle/csx";

normalize();
setupPage('#root');

// All your designs will now be more consistent across browsers
```

Notes on some non `css` stuff in this page setup: 
* `<meta name="viewport" content="width=device-width">` ensures that mobile browsers use their width to render the page. Otherwise mobiles render the page at desktop resolutions, forcing the user to zoom in to read text and then you get horizontal scrollbars. Its lovingly called the *responsive meta tag*.
* Having the `script` after the root `div` ensures that it can be used from our JavaScript without needing something like `DOMContentLoaded`

[normalize.css]:https://github.com/necolas/normalize.css
