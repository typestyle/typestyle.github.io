For large scale application development static code analysis can be invaluable for developer productivity. We created TypeStyle with this in mind. However the *JavaScript* playgrounds out there don't utilize the full power of *TypeScript*. This is understandable as

* You need a disk system (rules out quite a few playgrounds)
* Its hard work, difficult to do if its not your main focus (similar to how we created [alm](http://alm.tools/) to be a focused IDE).

So we created our own. Introducing the TypeStyle playground : [http://typestyle.io/play/](http://typestyle.io/play/).

It differs from the TypeScript playground in that it supports *full* demo development with

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

### Live output
The last JSX expression that gets evaluated in the code gets rendered to the output window. You are free to write any other TypeScript code before that if you want.

```play
let message = "Hello World!"; 
<h1>
  {message}
</h1>
```

![](/images/book/play/full.png)

## Compilation Context
We put the following variables into the compilation context (and runtime) for you so that you don't need to do anything special 

* `typestyle`: The complete `"typestyle"` module
* `csx`: The complete `"typestyle/lib/csx"` module
* `style`, `keyframes`, `classes` from the `"typestyle"` module

Additionally we have `React` in context as well as its used internally by any JSX (e.g. `<div/>` becomes `React.createElement('div')`). 