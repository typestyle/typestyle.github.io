How you manage the space around and inside your components is vital to a great design. First a quick recap of some core CSS concepts that we will use here.

### Never let margin bleed
You really only need to know the difference between `margin` (something that's outside) and `padding` (something that is inside). Here's a picture:

![](/images/book/marginpadding.gif)


One more thing about margin : *it collapses*. This means that if two items are next to each other with a margin of `30px` and `20px`, instead of of being separated by `50px` they will be separated by `30px`. This shown below:

![](/images/book/marginsibling.png)

Not only that, if an element is unfortunate to be at the border of its parent, its margin will collapse with its parent. These facts are shown below:

![](/images/book/marginchild.png)

This makes it very difficult to create a maintainable layout system if your components have external margins

* Don't have an external `margin` on components.
* `margin` is something that a parent should push down to put a visual seperation between its children. More on this later.

### Avoid inline
Having an element as `display: inline` means that it completely ignores its height. Here is a visual difference where an element has been given a height but `inline` ignored it and `inline-block` got it.

![](/images/book/inline.png)

![](/images/book/inlineBlock.png)

Also you cannot CSS3 transform inline elements. So use a `span` but if there is anything fancy you need the `span` to do, be sure to `inline-block` it.

> TIP: `csx` has a mixin `csx.inlineBlock` for your inline desires. 