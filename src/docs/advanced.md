* [Concept: Ensuring a unique selector](/#/core/concept-ensuring-a-unique-selector)

## Concept: Ensuring a unique selector
We automatically try to generate the smallest deduped CSS possible e.g. the following 
```ts
style({ color: 'red', $nest: { '&>*': { color: 'red' } } });
```
Generates the CSS: 
```css
.f1nv0def,.f1nv0def>*{color:red}
```
You can see that since the structure `{color:red}` was common, so the selectors `.f1nv0def,.f1nv0def>*` are concatenated. However in certain browser scenarios e.g. `placeholder` styling (the only one we have experienced for now) you need to ensure that each selector gets its own body e.g. 

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