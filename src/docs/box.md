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

> TIP: `csstips` has a mixin `csstips.inlineBlock` for your inline desires. 

## `csstips.padding`

`csstips.padding` is a nice mixin to create padding for managing the space inside a component. e.g. Here is some pretty text you can hover over,

```play
import {style} from 'typestyle';
import * as csx from 'csx';
import * as csstips from 'csstips';

const bg = csx.black;
const color = csx.white;
const prettyBox = style(
  csstips.padding(10),
  csstips.inlineBlock,
  {
    color:color.darken(.2),
    cursor:'pointer',
    backgroundColor:bg,
    transition: 'color .2s, background-color .2s',
    $nest: {
      '&:hover':{
        color: color,
        backgroundColor:bg.lighten(.2),
      }
    }
  }
);

<div className={prettyBox}>Hello World</div>
```

This is what a padding should be used for. Maintaining a nice boundary seperation *inside* a component.

## Spacing children

> If a function only does mutation inside is it still functional?

Remeber the lesson of margins: You cannot have margins bleed. However you can use them to create a nice visual seperation between *your* children (subitems of the component). We provide utilities for just that `csstips.horizontallySpaced` and `csstips.verticallySpaced` 

E.g. a nice vertical layout: 

```play
import {style} from 'typestyle';
import * as csstips from 'csstips';

const DemoItem = () => <h1 className={style(
    csstips.centerCenter,
    {backgroundColor:csx.lightskyblue,border: '1px solid dashed'}
  )}>
  Demo Item
</h1>;

<div className={style(csstips.vertical,csstips.verticallySpaced(15))}> 
  <DemoItem/>
  <DemoItem/>
  <DemoItem/>
</div>
```

The reason for letting such spacing come down from the parent *instead* of having it on each `DemoItem` is common in application layouts, where you have buttons / page sections popping in and popping out due to some logic regarding page state and user permissions. Having this visual seperation come down using *margins* from the parent results in a more maintainable layout (as the components can be blissfully unaware of their siblings).

Spacing items like this where there is no *margin bleed* at the borders **composes** nicely too e.g. here are two columns: 

 ```play
import {style} from 'typestyle';
import * as csx from 'csx';
import * as csstips from 'csstips';

const DemoItem = () => <h1 className={style(
    csstips.centerCenter,
    {backgroundColor:csx.lightskyblue,border: '1px solid dashed'}
  )}>
  Demo Item
</h1>;

/* Sample showing DemoItems composing */
const DemoCollection = () => <div className={style(csstips.vertical,csstips.verticallySpaced(15))}> 
  <DemoItem/>
  <DemoItem/>
  <DemoItem/>
</div>;

/* Sample showing DemoCollections composing */
<div className={style(csstips.vertical,csstips.verticallySpaced(15))}> 
  <DemoCollection/>
  <DemoCollection/>
</div>;
```

You can see that, for the user, its impossible to tell the fact that there are two sets of three `DemoItem`s instead of one set of six `DemoItem`s.

At some level up the heirarchy you would need to create a visual seperation from the border (e.g. at the page level) and there you should use `csstips.padding`. This is shown below where we have a nice root `Page` component: 

 ```play
import {style} from 'typestyle';
import * as csx from 'csx';
import * as csstips from 'csstips';

const DemoItem = () => <h1 className={style(
    csstips.centerCenter,
    {backgroundColor:csx.lightskyblue,border: '1px solid dashed'}
  )}>
  Demo Item
</h1>;

const DemoCollection = () => <div className={style(csstips.vertical,csstips.verticallySpaced(15))}> 
  <DemoItem/>
  <DemoItem/>
  <DemoItem/>
</div>;

/** A nice Page component with padding */
const Page = (props) => <div className={style(csstips.vertical,csstips.verticallySpaced(15), csstips.padding(15))}>
 {props.children}
</div>;

<Page>
  <DemoCollection/>
  <DemoCollection/>
</Page>;
```

