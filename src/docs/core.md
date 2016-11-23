At the heart of typestyle is the simple `style` function. It is the function you use to interact with CSS.

## `style`
The signature of this function is super simple: 

```ts
style(...objects: NestedCSSProperties[]): string
```

You get a hold of it from TypeStyle:

```ts
import { style } from "typestyle";
``` 

Essentially it allows you to write CSS in a JS or TypeScript (for greater type safety). For example, lets say you want to create some `red` stuff: 

```ts
/** Import */
import {style} from "typestyle";

/** convert a style object to a CSS class name */
const className = style({color: 'red'});
```

You would use the *generated* class name just like you would use some actual class name e.g. with React: 

```play
/** Import */
import {style} from "typestyle";

/** convert a style object to a CSS class name */
const className = style({color: 'red'});

/** Usage with e.g. React */
const MyText = ({text}) => 
  <div className={className}>
    {text}
  </div>;

/** Use the component */
<MyText text="Hello world!"/>
```

The class name will look something like `f14svl5e`, this is basically a *hash* of the style objects passed to `style`. In the background `style` has gone ahead and also inserted CSS like `.f14svl5e { color: red }` into the document so using this class name with *any* framework has the desired effect of styling the element.

## Concept: Mixin

> A mixin is an object that contains properties for reuse

The `style` function can take multiple objects. This makes it easy to reuse simple style objects e.g. 

```play
const redMaker = {color:'red'};
const bigFont = {fontSize: '50px'};
const bigRedClass = style(
  redMaker,
  bigFont
);

<div className={bigRedClass}>Hello world</div>
```

In fact a large number of mixins are provided by `csx` (`import * as csx from 'typestyle/lib/csx'`). e.g. for flexbox we have `csx.flex`, `csx.content`, `csx.vertical` etc. Use them as you would naturally expect e.g. 

```ts
import * as csx from 'typestyle/lib/csx';
import {style} from 'typestyle';

const flexHorizontalGreen = style(
  csx.flex,
  csx.horizontal,
  { backgroundColor: 'green' }
);

/** Sample usage with React */
const Demo = () =>
  <div className={flexHorizontalGreen}>
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
  </div>;
```

## Concept: Interpolation
You can use `&` in any key for the object passed to `style` and its get replaced with the generated class name when its written to CSS. As an example it allows super simple pseudo state (`&:hover`, `&:active`, `&:focus`, `&:disabled`) customization: 

```play
import {style} from "typestyle";

/** convert a style object to a CSS class name */
const niceColors = style({
  transition: 'color .2s',
  color: 'blue',
  '&:hover': {
    color: 'red'
  }
});

<h1 className={niceColors}>Hello world</h1>
```

or even child selectors for example a nicely spaced vertical layout: 

```play
import {style} from "typestyle";

/** Share constants in TS! */
const spacing = '5px';

/** style -> className :) */
const niceVerticalLayout = style({
  '&>*': {
    marginBottom: spacing,
  },
  '&>*:last-child': {
    marginBottom: '0px',
  }
});

<div className={niceVerticalLayout}>
  <div>foo</div>
  <div>bar</div>
  <div>bas</div>
</div>  
```

> Note: ^ if this CSS looks complex to you, I don't blame you. That's why it in a nice csx mixin e.g. `csx.verticallySpaced(10)`. More on this function when we look at csx box functions later in the book.

## Concept: Media queries 

You can use the `media` function to indicate that you want to customize the CSS when a certain media query is met. We generate the *right* CSS for you. Example usage: 

```play
import { style, media } from "typestyle";

const sizeChangingClass = style(
  {transition: 'font-size .2s'},
  media({minWidth:0,maxWidth:600}, {fontSize: '24px'}),
  media({minWidth:601}, {fontSize: '50px'}),
);

<h1 className={sizeChangingClass}>Hello world</h1>
```

## Concept: Keyframes

Keyframes in CSS must be named and defined at the root level (much like class names). Fortunately just like `style` lets you not worry about that *global namespace*, the `keyframes` function takes keyframes and generates an *animation name* that you can then use in a style. Here is a simple example: 

```play
const colorAnimationName = typestyle.keyframes({
  '0%': { color: 'black' },
  '50%': { color: 'blue' }
})

const ooooClass = typestyle.style({
  animationName: colorAnimationName,
  animationDuration: '1s',
  animationIterationCount: 'infinite',
});

<h1 className={ooooClass}>Hello world</h1>
```

## Tip: Code Organization
How you use the `style` function and organize the class names and style objects is really up to you. However it's good to get some guidance. With my colleages and OSS projects I've been using TypeScript namespaces: 

```ts
/** Think of it like an inline stylesheet */
namespace MyStyles {
  const color = 'red';

  export const alwaysRedClass = style({color});
  export const onlyRedOnHoverClass = style({'&:hover':{color});
}

/** Use e.g. with React */
const AlwaysRed = ({text}) => <div className={MyStyles.alwaysRedClass}>{text}</div>
const OnlyRedOnHover = ({text}) => <div className={MyStyles.onlyRedOnHoverClass}>{text}</div>
```

Also suffix `Class` for classes.

## CSX
We understand that its difficult to get started with CSS in JS without additional guidance. So we also provide a lot of utility style objects in `typestyle/lib/csx` to decrease you rampup. Also these give more semantic names to CSS concepts that are used commonly. More on this later.

That's it for the core of TypeStyle. Simple right!

