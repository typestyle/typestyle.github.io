* [Concept: Deduping](/#/advanced/concept-deduping)
* [Concept: Ordering pseudo classes](/#/advanced/concept-ordering-pseudo-classes)
* [Concept: Ordering media queries](/#/advanced/concept-ordering-media-queries)
* [Concept: Ensuring a unique selector](/#/advanced/concept-ensuring-a-unique-selector)
* [content](/#/advanced/-content-)
* [$debugName](/#/advanced/-debugname-)

## Concept: Deduping
It is safe to call `style` with the same object strucure again and again (e.g. from within a react render function). `style` doesn't generate new CSS if it's not required, this is shown below:

```play
import {style} from 'typestyle';
import * as csx from 'csx';

const a = style({color:csx.red});
const b = style({color:csx.red});

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
In certain browser scenarios e.g. `placeholder` styling (the only one we have experienced for now) you need to ensure that each selector gets its own body e.g. 

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

Note that this name is purely for debugging convinience and has no impact on any of the other logic (e.g. deduping). Additionally if you run a production build of your code (`process.env.NODE_ENV !== 'production'`) this name is removed so use as much as you want.
