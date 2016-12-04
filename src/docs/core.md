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
You can nest properties for different states using the `nested` property. Any `&` in a key for the object passed to `style` get replaced with the generated class name when its written to CSS. As an example it allows super simple pseudo state (`&:hover`, `&:active`, `&:focus`, `&:disabled`) customization: 

```play
import {style} from "typestyle";

/** convert a style object to a CSS class name */
const niceColors = style({
  transition: 'color .2s',
  color: 'blue',
  nested: {
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
  nested: {
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

## Tip: Declaring new CSS stuff
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

## Tip: Code Organization
How you use the `style` function and organize the class names and style objects is really up to you. However it's good to get some guidance. With my colleages and OSS projects I've been using TypeScript namespaces: 

```play
/** Think of it like an inline stylesheet */
namespace MyStyles {
  const color = 'red';

  export const alwaysRedClass = style({color});
  export const onlyRedOnHoverClass = style({
    nested:{
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

