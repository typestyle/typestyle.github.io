* [Concept: Deduping](/#/advanced/concept-deduping)
* [Concept: Ordering pseudo classes](/#/advanced/concept-ordering-pseudo-classes)
* [Concept: Ordering media queries](/#/advanced/concept-ordering-media-queries)
* [Concept: Ensuring a unique selector](/#/advanced/concept-ensuring-a-unique-selector)
* [content](/#/advanced/-content-)
* [Google Fonts](/#/advanced/google-fonts)
* [$debugName](/#/advanced/-debugname-)
* [Multiple instances](/#/core/multiple-instances)

## Concept: Deduping
It is safe to call `style` with the same object strucure again and again (e.g. from within a react render function). `style` doesn't generate new CSS if it's not required, this is shown below:

```play
import {style} from 'typestyle';

const a = style({color:'red'});
const b = style({color:'red'});

<div>a:{a},b:{b}. Same? {(a===b).toString()}</div>;
```

We even automatically try to generate the smallest deduped CSS possible e.g. the following 
```ts
style({ color: 'red', $nest: { '&>*': { color: 'red' } } });
```
Generates the CSS: 
```css
.f1nv0def,.f1nv0def>*{color:red}
```
You can see that since the structure `{color:red}` was common, so the selectors `.f1nv0def,.f1nv0def>*` are concatenated.

This gives the following gains:

* No needless CSS updates + reflows.
* True freedom to use `className` like you would use `style` in your framework of choice.
* No style bloat: Automatically smaller stylesheets based on your object reuse.

## Concept: Ordering pseudo classes
You normally don't need to worry about ordering your pseudo classes. For cases when you do, you should use `&&`, then `&&&` so on, to increase specificity (in CSS `.foo` loses to `.foo.foo`). This also shows that you explicitly want the ordering to matter for any later code review.

```play
/** BAD */
const hoverBackground = 'green';
const focusBackground = 'red';
const buttonClass = style({
  $nest: {
    '&:focus': { background: focusBackground },
    '&:hover': { background: hoverBackground },
  },
});

/** Force `:focus` to come to the bottom of the generated CSS due to deduping */
const moveDown = style({
  background: focusBackground
});

/** Now `hover` will not work if `focus`ed anymore! */
<div>
  <button className={buttonClass}>Hello</button>
  <button className={buttonClass}>World</button>
</div>
```

Sample fix:

```play
/** GOOD */
const hoverBackground = 'green';
const focusBackground = 'red';
const buttonClass = style({
  $nest: {
    '&:focus': { background: focusBackground },
    /** Use && to increase specifity and show that order matters */
    '&&:hover': { background: hoverBackground },
  },
});

/** Force `:focus` to come to the bottom of the generated CSS due to deduping */
const moveDown = style({
  background: focusBackground
});

/** Now `hover` will still work even if `focus`ed! */
<div>
  <button className={buttonClass}>Hello</button>
  <button className={buttonClass}>World</button>
</div>
```

A common pattern is sytling anchors using [LVHA-order](https://developer.mozilla.org/en-US/docs/Web/CSS/:active): 

```play
const anchorClass = style({
  $nest: {
    '&:link': { color: 'blue' },
    '&&:visited': { color: 'purple' },
    '&&&:hover': { fontWeight: 'bold' },
    '&&&&:active': { color: 'lime' },
  },
});

<a 
  className={anchorClass} 
  href='https://typestyle.github.io/' 
  target='_blank'>TypeStyle</a>;
```

## Concept: Ordering media queries
Conventional css authors will write media queries with an *override* mindset i.e

```css
.some {
  /** Common */
  font-size: 50px;
  /** Default */
  color: red;
}
/** Override: change for bigger screens */
@media (min-width: 500px) {
  .some {
    color: green;
  }
}
```

Due to style deduping you should not depend on style ordering, with TypeStyle you should write with a *mutally exclusive* mindset

```play
import { style, media } from 'typestyle';

const some = style(
  /** Common */
  {fontSize: '50px'},
  /** Default */
  media({minWidth: 0, maxWidth: 499}, {color:'red'}),
  /** Change for bigger screens */
  media({minWidth: 500}, {color:'green'}),
);

<div className={some}>Hello world</div>;
```

## Concept: Ensuring a unique selector
For certain browser scenarios you need to have a unique selector with its own body. The only use case we have experienced for now are browser specific pseudo selectors. For example for `placeholder` styling, having multiple browser specific selectors does not work (even though its valid CSS): 

```css
/** Does not work */
.f13byak::-webkit-input-placeholder, /* WebKit fails here */
.f13byak::-moz-placeholder,          /* Firefox fails here */
.f13byak::-ms-input-placeholder {    /* IE fails here */
    color: rgb(255, 0, 0),
}

/** Does work */
.f13byak::-webkit-input-placeholder {
    color: rgb(255, 0, 0),
}
.f13byak::-moz-placeholder {
    color: rgb(255, 0, 0),
}
.f13byak::-ms-input-placeholder {
    color: rgb(255, 0, 0),
}
```

You can ensure that a selector gets its own body by adding `$unique : true`. This ensures *that particular object* is not tested for deduping and always emitted even if a similar structure exists: 

```play
const className = style({
  $nest: {
    '&::-webkit-input-placeholder': {
      $unique: true,
      color: `rgb(255, 0, 0)`,
    },
    '&::-moz-placeholder': {
      $unique: true,
      color: `rgb(255, 0, 0)`,
    },
    '&::-ms-input-placeholder': {
      $unique: true,
      color: `rgb(255, 0, 0)`,
    }
  }
});

<input className={className} placeholder="Sample placeholder"/>
```

## `content`

When assigning a string to the content property it requires double or single quotes in CSS. So you should use whatever string you want e.g. if you want to prefix with `'Hello'` you can wrap that whole content easily with backticks.

```play
const hello = style({
  $nest: {
    '&:before': {
      content: `'Hello '`
    }  
  }
});
<div className={hello}>is it me you are looking for?</div>
```
We don't do automatic quoting as you are free to use other things in CSS content that aren't quoted e.g. `attr`: 

```play
const before = style({
  $nest: {
    '&:before': {
      content: `attr(data-before)`
    }  
  }
});
<div className={before} data-before={'Hello '}>
  is it me you are looking for?
</div>
```

## Google Fonts
If you want to use google fonts e.g. [Roboto](http://www.google.com/fonts#UsePlace:use/Collection:Roboto), you can just use the `@import` syntax they give you with `cssRaw` 

> Note: Be sure to have this call *before* any other calls to `cssRaw` because [@import only works if its at the top of the file](https://www.w3.org/TR/css-cascade-3/#at-import)

```ts
/** Import the file */
cssRaw(`
@import url('https://fonts.googleapis.com/css?family=Roboto');
`);

```
and then you can use the font like you normally would e.g. 

```ts
/** Elsewhere */
const className = style({fontFamily:'Roboto, sans-serif'});
<div>
  <h1 className={className}>Demo</h1>
  <h2 className={className}>Demo</h2>
  <h3 className={className}>Demo</h3>
  <h4 className={className}>Demo</h4>
  <h5 className={className}>Demo</h5>
</div>;
```

## `$debugName`
If you want meaningful word associated with the generated className for debugging you can use the `$debugName` property e.g.: 

```play
const className = style({
  $debugName: 'bigRed',
  color: 'red',
  fontSize: '50px',
});
<div className={className}>
  The className: 
  <br/>
  {className}
</div>;
```

Note that this name is purely for debugging convenience and has no impact on any of the other logic (e.g. deduping).

## Multiple instances
The core `style` function is simply a handle to a single instance of `TypeStyle.style`.

You can create multiple instances of TypeStyle using the `createTypeStyle` function. There are two ways to use this function: 

* You can use this to create a TypeStyle instance if you just want to *collect* the generated CSS. 

```js
const instance = typestyle.createTypeStyle();
instance.style({ color : 'red' }); // Will not write a stylesheet anywhere. 
const styles = instance.getStyles(); // Write these styles somewhere. You can write them to a tag or a file or wherever. 
```

* You can pass in a style tag and this typestyle instance will write the styles to that tag. 

```js
const tag = document.createElement('style');
document.head.appendChild(tag);
const instance = typestyle.createTypeStyle(tag);
instance.style({ color : 'red' }); // Will write to the tag you created
```
