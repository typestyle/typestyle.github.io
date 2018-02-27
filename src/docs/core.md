* [style](/#/core/-style-)
* [Concept: Mixin](/#/core/concept-mixin)
* [Concept: Interpolation / Pseudo classes / Pseudo elements](/#/core/concept-interpolation)
* [Concept: Media Queries](/#/core/concept-media-queries)
* [Concept: Keyframes / Animations](/#/core/concept-keyframes)
* [Concept: Composing classes / Customizable components](/#/core/-classes-)
* [Concept: Theming](/#/core/concept-theming)
* [Concept: Fallbacks](/#/core/concept-fallbacks)
* [TIP: forceRenderStyles](/#/core/tip-forcerenderstyles-)
* [TIP: Declaring new CSS stuff](/#/core/tip-declaring-new-css-stuff)
* [TIP: Code Organization](/#/core/tip-code-organization)
* [Stylesheets (v1.7.x)](/#/core/-stylesheet-)

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

In fact a large number of mixins are provided by `csstips` (`import * as csstips from 'csstips'`). e.g. for flexbox we have `csstips.flex`, `csstips.content`, `csstips.vertical` etc. Use them as you would naturally expect e.g. 

```ts
import * as csstips from 'csstips';
import {style} from 'typestyle';

const flexHorizontalGreen = style(
  csstips.flex,
  csstips.horizontal,
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
You can nest properties for different selectors using the `$nest` property. Any `&` in a key for `$nest` gets replaced with the generated class name when its written to CSS. As an example it allows super simple CSS pseudo class (`&:hover`, `&:active`, `&:focus`, `&:disabled`) customization: 

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

it also allows you to use pseudo-elements (e.g. `::after`, `&::before` etc): 

```play
const hello = style({
  $nest: {
    '&::before': {
      content:`'Hello '`
    }
  }
});

<div className={hello}>World</div>
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

> Note: ^ if this CSS looks complex to you, I don't blame you. That's why it in a nice csstips mixin e.g. `csstips.verticallySpaced(10)`. More on this function when we look at csstips box functions later in the book.

And even use it to style third party dom safely e.g 

```play
const container = style({
  $nest: {
    '& .third-party-class': {
      color: 'red'
    }
  }
});

<div className={container}>
  { /** third party dom  */ }
  <div>
    <div className='third-party-class'>Some third party dom</div>
  </div>
</div>
```

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

CSS classes compose nicely (mostly). We have a function `classes` to make composing classes (essentially string concatenation) easier:

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
  <Message text="World" className={style({backgroundColor:'blue'})}/>
</div>
```

> You can use `className` to allow *full* customization of any of your components (something that can't be done with style attributes). Using `className`/`classes`.

Also `classes` safely ignores any *falsy* values so you can *optionally* merge classes if you need to: 

```ts
const tallClass = style({height:'100px'});
const coloredClass = style({color:'red'});

/** Compose classes */
const tallColoredClass = typestyle.classes(tallClass, coloredClass);

/** Even conditionally (any falsy parameters are ignored in the composed class name) */
const mightBeColored = typestyle.classes(tallClass, hasError && coloredClass);
``` 

ProTip: If you want to *override* a property in the default class use `!important` just like CSS: 

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
  <Message text="World" className={style({color:'red !important'})}/>
</div>
```

## Concept: Theming 

Since its just JavaScript you can easily use JS modules with variables to change component sytes. e.g. 

* `styles.ts`

```ts
import { types } from 'typestyle';

// For simple customizations
export namespace Colors {
  export let buttonCore = 'white';
}

// For complete customizations
export namespace Overrides {
  export let buttonOverrides: types.NestedCSSPropertyes = {};
}
```

* `button.tsx` that can be themed 

```ts
import { Colors, Overrides } from './style';
import { style } from 'typestyle';
import * as React from 'react';

namespace ButtonStyles {
  export const buttonClass = style({
    color: Colors.buttonCore
  }, Overrides.buttonOverrides);
}

export const Button = ({text})=> <button className={ButtonStyles.buttonClass}>
  {text}
</button>;
```

* Some `myTheme.ts`

```js
import { Colors, Overrides } from './style';

// Simple customizations 
Colors.buttonCore = 'red';

// Complex customizations
Overrides.buttonOverrides = {
  backgroundColor: 'blue';
};
```

Then a default use of the button would be simply: 

```ts
// Application Logic
import {Button} from './button';
<Button text="hello"/>;
```

And if you load `myTheme` in your application *at any point before importing `button`* you get the themed button: 

```ts
// Theme the application 
import './myTheme';


// Application Logic
import {Button} from './button';
<Button text="hello"/>;
```

You can have as many Theme files with as much customization as you want.

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


## `stylesheet`

Sometimes we need to define a whole lot of styles at once.  We have a helper function `stylesheet` (added in version 1.7.0) that makes defining several classes at once very simple.  For example:

```play
const baseButton = {
  border: 'solid thin lightgray',
  borderRadius: 2,
  color: 'white',
  padding: '4px 10px'
}

const css = stylesheet({
  component: {
      display: 'flex'
  },
  primaryButton: {
      backgroundColor: 'darkblue',
      ...baseButton
  },
  secondaryButton: {
      backgroundColor: 'teal',
      ...baseButton
  }
});

<div className={css.component}>
  <button className={css.primaryButton}>Primary</button>
  <button className={css.secondaryButton}>Secondary</button>
</div>
```

In this example, we are using `stylesheet` to create three different TypeStyle classes: component, primaryButton, and secondaryButton.  The resulting `css` object is a dictionary of the key provided (primaryButton for example) linked to the generated css class. 

Each class can be defined with the same properties as `style` including $nest.  As a bonus, each generated class is automatically prefixed as if it had been declared with $debugName.  Without using stylesheet, we would have had to write this:

```play
namespace css {
  const baseButton = {
    border: 'solid thin lightgray',
    borderRadius: 2,
    color: 'white',
    padding: '4px 10px'
  }

  export const component = style({
    $debugName: 'component',
    display: 'flex'
  }, baseButton);

  export const primaryButton = style({
    $debugName: 'primaryButton',
    backgroundColor: 'darkblue',
  }, baseButton);

  export const secondaryButton = style({
    $debugName: 'secondaryButton',
    backgroundColor: 'teal',
  }, baseButton);
}

<div className={css.component}>
  <button className={css.primaryButton}>Primary</button>
  <button className={css.secondaryButton}>Secondary</button>
</div>
```

While there are certain advantages to both namespacing and `stylesheet`, The `stylesheet` function requires less typing and also works when building a project without TypeScript.


That's it for the core of TypeStyle. Simple!
