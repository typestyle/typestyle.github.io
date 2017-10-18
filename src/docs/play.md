We found the JavaScript playgrounds out there missing key features for a great TypeScript experience.

> ProTip: You *can* use typestyle in playgrounds as we also provide a `umd` build: e.g. https://unpkg.com/typestyle@0.22.0/umd/typestyle.js example http://codepen.io/basarat/pen/GNeyzX

Introducing the TypeStyle playground : [https://typestyle.github.io/play/](https://typestyle.github.io/play/). It supports *full* demo development with:

* JavaScript in the form of TypeScript
* HTML in the form of React/JSX
* CSS in the form of TypeStyle

Here is the hello world:

```play
<div>
  Hello world
</div>
```

## Features

### Autocomplete
`ctrl + space`

![](/images/book/play/autocomplete.png)

### Errors
We do continuous linting (TypeScript is really just the world's most powerful JavaScript linter). The first error is shown inline so you don't need to use your mouse much.

![](/images/book/play/error.png)

## Sharing

The url is always kept in sync with the code so you can share it around at any point you want.

## Compilation Context
We put the following variables into the compilation context (and runtime) for you so that you don't need to do anything special

* `typestyle`: The complete `"typestyle"` module
* `style`, `keyframes`, `classes` from the `"typestyle"` module
* `csstips` : The complete `"csstips"` module
* `csx`: The complete `"typestyle/lib/csx"` module


Additionally we have `React` in context as well as its used internally by any JSX (e.g. `<div/>` becomes `React.createElement('div')`). You can even create your own React components

```play
const HelloWorld = () => <div>Hello World</div>;
<HelloWorld/>
```

## Output
The last JSX expression that gets evaluated in the code gets rendered to the output window. You are free to write any other TypeScript code before that if you want.

```play
let message = "Hello World!";
<h1>
  {message}
</h1>
```

![](/images/book/play/full.png)

## Root

> We cover more of `csx` / `csstips` and the concepts of mixins and flexbox and all that jazz in other sections of the book. This is just a quick look to demonstrate the playground.  

The output is rendered in a container that has `position: relative`. So you can attach to it with handy dandy `csx.fillParent` e.g.

```play
const bg = (backgroundColor) => ({backgroundColor});

<div className={style(csstips.fillParent, bg(csx.lightskyblue))}>
  I fill the root
</div>
```

And if you want to play with flexbox just use `csstips.vertical` (or `csstips.horizontal`) wherever it makes sense e.g. here we show two flex children:

```play
const bg = (backgroundColor) => ({backgroundColor});

<div className={style(csstips.fillParent, csstips.vertical)}>
  <div className={style(csstips.flex, bg(csx.lightskyblue))}/>
  <div className={style(csstips.flex, bg(csx.lightsalmon))}/>
</div>
```

And another with three children showing a common header / body / footer layout:

```play
const bg = (backgroundColor) => ({backgroundColor});

<div className={style(csstips.fillParent, csstips.vertical)}>
  <div className={style(csstips.content,csstips.height(50), bg(csx.lightskyblue))}>
    Header
  </div>
  <div className={style(csstips.flex, bg(csx.lightsalmon))}>
    Body
  </div>
  <div className={style(csstips.content,csstips.height(50), bg(csx.lightskyblue))}>
    Footer
  </div>
</div>
```
