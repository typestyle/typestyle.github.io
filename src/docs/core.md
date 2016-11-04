At the heart of typestyle is the simple `style` function. It is the function you use to interact with CSS.

### `style`
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

```ts
/** Import */
import {style} from "typestyle";

/** convert a style object to a CSS class name */
const className = style({color: 'red'});

/** Usage with e.g. React */
const MyText =
  ({text})
    => <div className={className}>
        {text}
      </div>
```

The class name will look something like `f14svl5e`, this is basically a *hash* of the style objects passed to `style`. In the background `style` has gone ahead and also inserted CSS like `.f14svl5e { color: red }` into the document so using this class name with *any* framework has the desired effect of styling the element.

With this simple function the following problems with maintaining CSS are solved: 

* No global variables (with raw CSS it all gets thrown into a global namespace. This results in hard to debug / maintain conflicts)
* Built in dependency system (Same as for the rest of your JS. e.g. NPM)
* Dead code elimination (e.g. on `noUnusedLocals` in TypeScript)
* Minification (Minify JS with existing tools)
* Shared constants and reusable styles (Using variables and objects)
* Extensible (Just use JavaScript with all its power)
* Your components are still free to have class names that you can give to external people to further style your stuff (better still take `clasName` as a property and let them use *typestyle* too!).
* No style bloat (will magically merges duplicate styles as the same style object structure gives the same className which is only written once!)
* Develop components alongside the style (No more hunting CSS files for estranged `ul > li > a`)
* Create isomorphic applications (easy export to a CSS file is supported)
* All the power of CSS without compromise e.g. pseudo states (`{ '&:hover': { ... } }`)
* Better than CSS management of media queries (`{ '@media (min-width: 500px)': { ... } }`)
* Overload CSS properties using arrays (`{ backgroundColor: ['red', 'linear-gradient(to right, red 0%, blue 100%)'] }`)
* Integrates with any third-party system
* Extremely small and powerful API that works with any ecosystem

> Note: Many of these are truly the same advantages FreeStyle. Now for the differentiators.

* Provides great TypeScript developer autocomplete experience.
* No custom AST transform or module loader support needed.
* Works with any framework (react, angular2, cyclejs, whatever, doesn't matter).
* Zero config. Just use.
* Super small core size (~1k).

### CSX
We understand that its difficult to get started with CSS in JS without additional guidance. So we also provide a lot of utility style objects in `typestyle/csx` to decrease you rampup. Also these give more semantic names to CSS concepts that are used commonly. More on this later.

### Concept: Mixin

> A mixin is an object that contains properties for reuse

The `style` functions can take multiple objects. This makes it easy to reuse simple style objects e.g. 

```ts
const redMaker = {color:'red'};
const alwaysRedClass = style(redMaker);
const greyOnHoverClass = style(
  redMaker,
  {'&:hover':{color: 'grey'}}
);
```

In fact a large number of mixins are provided by `csx` (`import * as csx from 'typestyle/csx'`). e.g. for flexbox we have `csx.flex`, `csx.content`, `csx.vertical` etc. Use them as you would naturally expect e.g. 

```ts
import * as csx from 'typestyle/csx';
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
