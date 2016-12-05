* [style](/#/core/-style-)
* [Concept: Mixin](/#/core/concept-mixin)
* [Concept: Interpolation](/#/core/concept-interpolation)
* [Concept: Media Queries](/#/core/concept-media-queries)
* [Concept: Keyframes](/#/core/concept-keyframes)
* [Concept: Composing classes](/#/core/-classes-)
* [Concept: Fallbacks](/#/core/concept-fallbacks)
* [TIP: forceRenderStyles](/#/core/tip-forcerenderstyles-)
* [TIP: Declaring new CSS stuff](/#/core/tip-declaring-new-css-stuff)
* [TIP: Code Organization](/#/core/tip-code-organization)

## `style`
At the heart of typestyle is the simple `style` function. It is the function you use to generate a CSS className. The signature of this function is super simple: 

```ts
style(...objects: NestedCSSProperties[]): string
```

It takes any number of `NestedCSSProperties` and gives you back a generated CSS `className`. You get a hold of it from TypeStyle:

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

Next we cover the two key things in the signature.
* Why we optionally take more than one object (hint : mixins)
* Why the objects `NestedCSSProperties` instead of `CSSProperties` (hint: interpolation and media queries)

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

It is just as easy functions to emulate CSS preprocessors using functions in JavaScript!

```play
import {style} from 'typestyle';

function bordered(type: string) {
  return {
    border: `${type} thin black`
  };
}

function roundCorners(radius: string = '5px') {
  return {
    '-webkit-border-radius': radius,
    '-moz-border-radius': radius,
    borderRadius: radius,
    '-moz-background-clip': 'padding',
    '-webkit-background-clip': 'padding-box',
    backgroundClip: 'padding-box'
  }
}

const mainButtonClass = style(
  bordered('solid'),
  roundCorners('0.5rem')
);

<button className={mainButtonClass}>
  Testing Mixins
</button>
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
You can nest properties for different states using the `$nest` property. Any `&` in a key for the object passed to `style` get replaced with the generated class name when its written to CSS. As an example it allows super simple pseudo state (`&:hover`, `&:active`, `&:focus`, `&:disabled`) customization: 

```play
import {style} from "typestyle";

/** convert a style object to a CSS class name */
const niceColors = style({
  transition: 'color .2s',
  color: 'blue',
  $nest: {
    '&:hover': {
      color: 'red'
    }
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
  $nest: {
    '&>*': {
      marginBottom: spacing,
    },
    '&>*:last-child': {
      marginBottom: '0px',
    }
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

## `classes`
CSS classes compose nicely. If a dom element has two classes applied to it, the second class gets to override any first class properties. We have a function `classes` to make composing classes (essentially string concatenation) easier: 

```play
const messageClass = style({
  color: 'grey',
  fontSize: '24px',
  width: '100%'
});

const Message = (props:{className?:string,text:string}) => {
  return (
    <p className={classes(messageClass,props.className)}>{props.text}</p>
  );
};

<div>
  {/** Without customization */}
  <Message text="Hello"/>
  {/** With customization */}
  <Message text="World" className={style({color:'red'})}/>
</div>
```

> You can use `className` to allow *full* customization of any of your components (something that can't be done with style attributes). Using `className`/`classes` also solves one of the hardest problems of CSS in JS i.e. external themeability.

Also `classes` safely ignores any *falsy* values so you can *optionally* merge classes if you need to: 

```ts
const tallClass = style({height:'100px'});
const coloredClass = style({color:'red'});

/** Compose classes */
const tallColoredClass = typestyle.classes(tallClass, coloredClass);

/** Even conditionally (any falsy parameters are ignored in the composed class name) */
const mightBeColored = typestyle.classes(tallClass, hasError && coloredClass);
``` 

## Concept: Fallbacks
There are two kinds of fallbacks in CSS and both are supported:

* Same key multiple values: Just use an *array* for the value e.g. background colors

```ts
const fallBackBackground = style({
  backgroundColor: [
    /* The fallback */
    'rgb(200, 54, 54)',
    /** Graceful upgrade */
    'rgba(200, 54, 54, 0.5)'
  ]
});
```

* Vendor prefixing: Anything that starts with `-` is not case renamed (i.e. no `fooBar` => `foo-bar`) e.g. for smooth scroll:

```ts
const scroll = style({
  '-webkit-overflow-scrolling': 'touch',
  overflow: 'auto'
});
``` 

## TIP: `forceRenderStyles`

Whenever you call `style` we go ahead and queue a CSS update for the next `requestAnimationFrame`. However on initial application you probably want to deterministically write the CSS right after writing the HTML to prevent an unsightly flash. An example is shown below: 

```ts
import {forceRenderStyles} from 'typestyle';

ReactDOM.render(<MyApp/>);
forceRenderStyles();
``` 

## TIP: Declaring new CSS stuff
We protect against typos e.g. if you misspell a property like `color`: 

```play
style({colour: 'red'}) // TypeScript Error: unknown prop `colour`
```
However there might be vendor prefixes or non standard CSS Property (or even some property we missed) that you might want to use. It is super easy to augment our types simply following the standard TypeScript pattern shown below:

![](./images/book/augmentTypes.png)

1. create a `.ts` file e.g. `augmentTypes.ts`
1. Agument the `"typestyle/lib/types".CSSProperties` interface
1. `import` the `augmentTypes` module from your application root
1. Yay! now you can use the new types with complete safety. 

But be sure to create an [issue with us](https://github.com/typestyle/typestyle/issues) so we can add to our `CSSProperties` to help future developers.

## TIP: Code Organization
How you use the `style` function and organize the class names and style objects is really up to you. However it's good to get some guidance. With my colleages and OSS projects I've been using TypeScript namespaces: 

```play
/** Think of it like an inline stylesheet */
namespace MyStyles {
  const color = 'red';

  export const alwaysRedClass = style({color});
  export const onlyRedOnHoverClass = style({
    $nest:{
      '&:hover':{color}
    }
  });
}

/** Use e.g. with React */
const AlwaysRed = ({text}) => <div className={MyStyles.alwaysRedClass}>{text}</div>;
const OnlyRedOnHover = ({text}) => <div className={MyStyles.onlyRedOnHoverClass}>{text}</div>;

<div>
  <AlwaysRed text="Hello"/>
  <OnlyRedOnHover text="World"/>
</div>
```

Also suffix `Class` for classes.

That's it for the core of TypeStyle. Simple right!

