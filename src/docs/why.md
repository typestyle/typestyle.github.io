The biggest reason is developer happiness🌹. 

## Concept: Deduping

It is safe to call `style` with the same object strucure again and again (e.g. from within a react render function) as it doesn't generate new CSS if its not required this is shown below: 

```play
import {style} from 'typestyle';
import * as csx from 'typestyle/lib/csx';

const a = style({color:csx.red});
const b = style({color:csx.red});

<div>a:{a},b:{b}. Same? {(a===b).toString()}</div>;
```

This gives the following gains: 

* No needless CSS updates + reflows.
* True freedom to use `className` like you would use `style` in your framework of choice.
* No style bloat: Automatically smaller stylesheets based on your object reuse.  

## More boring reasons 

Beyond that here is a boring list of additional reasons to use TypeStyle.

* No global variables (with raw CSS it all gets thrown into a global namespace. This results in hard to debug / maintain conflicts)
* Built in dependency system (Same as for the rest of your JS. e.g. NPM)
* Dead code elimination (e.g. on `noUnusedLocals` in TypeScript)
* Minification (Minify JS with existing tools)
* Shared constants and reusable styles (Using variables and objects)
* Extensible (Just use JavaScript with all its power)
* Your components are still free to have class names that you can give to external people to further style your stuff (better still take `clasName` as a property and let them use *typestyle* too!).
* Develop components alongside the style (No more hunting CSS files for estranged `ul > li > a`)
* Create isomorphic applications (easy export to a CSS file is supported)
* All the power of CSS without compromise e.g. pseudo states (`{ '&:hover': { ... } }`)
* Better than CSS management of media queries (`{ '@media (min-width: 500px)': { ... } }`)
* Overload CSS properties using arrays (`{ backgroundColor: ['red', 'linear-gradient(to right, red 0%, blue 100%)'] }`)
* Super small core size (~1k).
* Extremely small and powerful API that works with any ecosystem.
* Provides great TypeScript developer autocomplete experience.
* No custom AST transform or module loader support needed.
* Works with any framework (react, angular2, cyclejs, whatever, doesn't matter).
* Zero config. Just use.

> Note: Many of these are truly the advantages of using FreeStyle. The additional features by typestyle are *autoinjection*, *`css.d.ts`* (for autocomplete and errors), and *csx* (a great set of CSS functions and mixins to give a smooth learning curve for even new CSS devs). 
