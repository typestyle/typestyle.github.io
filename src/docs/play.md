For large scale application development static code analysis can be invaluable for developer productivity. We created TypeStyle with this in mind. However the *JavaScript* playgrounds out there don't utilize the full power of *TypeScript*. This is understandable as

* You need a disk system (rules out quite a few playgrounds)
* Its hard work, difficult to do if its not your main focus (similar to how we created [alm](http://alm.tools/) to be a focused IDE).

So we created our own. Introducing the TypeStyle playground : [http://typestyle.io/play/](http://typestyle.io/play/).

It differs from the TypeScript playground in that it supports *full* demo development with

* JavaScript in the form of TypeScript 
* HTML in the form of JSX 
* CSS in the form of TypeStyle

Here is the hello world:

```play
<div>
  Hello world
</div>
``` 