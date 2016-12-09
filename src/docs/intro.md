Maintainable CSS is nearly impossible. But writing maintainable JavaScript is a fairly solved problem. Lets combine the two to make CSS maintainability an issue of the past.

![](/images/autocomplete.gif)

The DOM `style` attribute is not enough to cater for things like psuedo states and media queries. We provide a simple *zero config* `style` function that gives you all the power of CSS with all the safety and maintainability of TypeScript / JavaScript. 

# Utilities 

TypeStyle core is actually **very** small (~1k) and you are free to use just that. However this guide and TypeStyle is designed to be approachable by both beginner and expert CSS devs. So we provide utilities that are mentioned next.

# About `csx`
Provided as a seperate library (`npm install csx`):

* helps you manage CSS properties e.g. **colors** and create typed CSS variables.

# About `csstips`

Provided as a seperate library (`npm install csstips`). Provides utilities for pagesetup / CSS normalization along with mixins and mixin creators.

* it essentially documents CSS tips that people might not be familiar with.
* gives names to these CSS tips.

# Installation 

Available easily via npm: 

```
npm install typestyle --save
```
