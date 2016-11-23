Maintainable CSS is nearly impossible. But writing maintainable JavaScript is a fairly solved problem. Lets combine the two to make CSS maintainability an issue of the past.

![](/images/autocomplete.gif)

The DOM `style` attribute is not enough to cater for things like psuedo states and media queries. We provide a simple *zero config* `style` function that gives you all the power of CSS with all the safety and maintainability of TypeScript / JavaScript. 

# About `csx`

TypeStyle core is actually **very** small (~1k) and you are free to use just that.

However this guide and TypeStyle is designed to be approachable by both beginner and expert CSS devs. Hence it has `csx` sections (a sub library `typestyle/lib/csx` that ships with typestyle) as we are trying to help beginners use CSS effectively:

* helps you manage common CSS properties like `padding`, `margin` and **colors**.
* it essentially documents CSS tips that people might not be familiar with.
* gives names to these CSS tips.

# Installation 

Available easily via npm: 

```
npm install typestyle --save
```