Maintainable CSS is nearly impossible. But writing maintainable JavaScript is a fairly solved problem. Lets combine the two to make CSS maintainability an issue of the past.

![](/images/autocomplete.gif)

The DOM `style` attribute is not enough to cater for things like psuedo states and media queries. We provide a simple *zero config* `style` function that gives you all the power of CSS with all the safety and maintainability of TypeScript / JavaScript. 

> **[Go ahead and jump to the core API](/#/core)** 
<br/>
> *or if you want motivation a boring list of reasons and notes follow*. 

# About `csx`

TypeStyle core is actually **very** small (~1k) and you are free to use **just that**.

However this guide and TypeStyle is designed to be approachable by both beginner and expert CSS devs. Hence it has `csx` sections (a sub library that ships with typestyle) as we are trying to help beginners use CSS effectively

* it essentially documents CSS tips that people might not be familiar with.
* gives names to these CSS tips.
* helps you manage common CSS properties like `padding`, `margin` and **colors**. 

# Boring list of reasons to use TypeStyle

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
* Super small core size (~1k).
* Extremely small and powerful API that works with any ecosystem.
* Provides great TypeScript developer autocomplete experience.
* No custom AST transform or module loader support needed.
* Works with any framework (react, angular2, cyclejs, whatever, doesn't matter).
* Zero config. Just use.

> Note: Many of these are truly the advantages of using FreeStyle. The additional features by typestyle are *autoinjection*, *`css.d.ts`* (for autocomplete and errors), and *csx* (a great set of CSS functions and mixins to give a smooth learning curve for even new CSS devs). 


