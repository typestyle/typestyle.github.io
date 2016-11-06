Color management in a large project is always a challenge.  With this in mind, TypeStyle comes with SASS/LESS inspired color functions to make styling simple and reusable.

### Named Colors
> TypeStyle comes with definitions for all major named colors in CSS.  Each of these ColorHelpers can be used anywhere a a CSSColor can be used.

```typescript
  import { aliceblue } from 'typestyle/csx';
```

<!-- todo: make this reusable -->
<style>
  .color-swatch {
    display: inline-block;
    width: 2rem;
    height: 1.3rem;
    border: solid thin hsla(0, 0%, 80%, 0.75);
    border-radius: 10%;
  }
  .color-grid {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }
  .color-grid .color-item {
    width: 11.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
</style>

<div class="color-grid">
    <div class="color-item">
        <span class="color-swatch" style="background-color:aliceblue"></span>
        <span class="label">aliceblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:antiquewhite"></span>
        <span class="label">antiquewhite</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:aqua"></span>
        <span class="label">aqua</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:aquamarine"></span>
        <span class="label">aquamarine</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:azure"></span>
        <span class="label">azure</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:beige"></span>
        <span class="label">beige</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:bisque"></span>
        <span class="label">bisque</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:black"></span>
        <span class="label">black</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:blanchedalmond"></span>
        <span class="label">blanchedalmond</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:blue"></span>
        <span class="label">blue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:blueviolet"></span>
        <span class="label">blueviolet</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:brown"></span>
        <span class="label">brown</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:burlywood"></span>
        <span class="label">burlywood</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:cadetblue"></span>
        <span class="label">cadetblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:chartreuse"></span>
        <span class="label">chartreuse</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:chocolate"></span>
        <span class="label">chocolate</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:coral"></span>
        <span class="label">coral</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:cornflowerblue"></span>
        <span class="label">cornflowerblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:cornsilk"></span>
        <span class="label">cornsilk</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:crimson"></span>
        <span class="label">crimson</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:cyan"></span>
        <span class="label">cyan</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkblue"></span>
        <span class="label">darkblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkcyan"></span>
        <span class="label">darkcyan</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkgoldenrod"></span>
        <span class="label">darkgoldenrod</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkgray"></span>
        <span class="label">darkgray</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkgreen"></span>
        <span class="label">darkgreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkgrey"></span>
        <span class="label">darkgrey</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkkhaki"></span>
        <span class="label">darkkhaki</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkmagenta"></span>
        <span class="label">darkmagenta</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkolivegreen"></span>
        <span class="label">darkolivegreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkorange"></span>
        <span class="label">darkorange</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkorchid"></span>
        <span class="label">darkorchid</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkred"></span>
        <span class="label">darkred</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darksalmon"></span>
        <span class="label">darksalmon</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkseagreen"></span>
        <span class="label">darkseagreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkslateblue"></span>
        <span class="label">darkslateblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkslategray"></span>
        <span class="label">darkslategray</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkslategrey"></span>
        <span class="label">darkslategrey</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkturquoise"></span>
        <span class="label">darkturquoise</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:darkviolet"></span>
        <span class="label">darkviolet</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:deeppink"></span>
        <span class="label">deeppink</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:deepskyblue"></span>
        <span class="label">deepskyblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:dimgray"></span>
        <span class="label">dimgray</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:dimgrey"></span>
        <span class="label">dimgrey</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:dodgerblue"></span>
        <span class="label">dodgerblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:firebrick"></span>
        <span class="label">firebrick</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:floralwhite"></span>
        <span class="label">floralwhite</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:forestgreen"></span>
        <span class="label">forestgreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:fuchsia"></span>
        <span class="label">fuchsia</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:gainsboro"></span>
        <span class="label">gainsboro</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:ghostwhite"></span>
        <span class="label">ghostwhite</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:gold"></span>
        <span class="label">gold</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:goldenrod"></span>
        <span class="label">goldenrod</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:gray"></span>
        <span class="label">gray</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:green"></span>
        <span class="label">green</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:greenyellow"></span>
        <span class="label">greenyellow</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:grey"></span>
        <span class="label">grey</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:honeydew"></span>
        <span class="label">honeydew</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:hotpink"></span>
        <span class="label">hotpink</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:indianred"></span>
        <span class="label">indianred</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:indigo"></span>
        <span class="label">indigo</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:ivory"></span>
        <span class="label">ivory</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:khaki"></span>
        <span class="label">khaki</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lavender"></span>
        <span class="label">lavender</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lavenderblush"></span>
        <span class="label">lavenderblush</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lawngreen"></span>
        <span class="label">lawngreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lemonchiffon"></span>
        <span class="label">lemonchiffon</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightblue"></span>
        <span class="label">lightblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightcoral"></span>
        <span class="label">lightcoral</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightcyan"></span>
        <span class="label">lightcyan</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightgoldenrodyellow"></span>
        <span class="label">lightgoldenrodyellow</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightgray"></span>
        <span class="label">lightgray</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightgreen"></span>
        <span class="label">lightgreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightgrey"></span>
        <span class="label">lightgrey</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightpink"></span>
        <span class="label">lightpink</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightsalmon"></span>
        <span class="label">lightsalmon</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightseagreen"></span>
        <span class="label">lightseagreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightskyblue"></span>
        <span class="label">lightskyblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightslategray"></span>
        <span class="label">lightslategray</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightslategrey"></span>
        <span class="label">lightslategrey</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightsteelblue"></span>
        <span class="label">lightsteelblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lightyellow"></span>
        <span class="label">lightyellow</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:lime"></span>
        <span class="label">lime</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:limegreen"></span>
        <span class="label">limegreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:linen"></span>
        <span class="label">linen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:maroon"></span>
        <span class="label">maroon</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumaquamarine"></span>
        <span class="label">mediumaquamarine</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumblue"></span>
        <span class="label">mediumblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumorchid"></span>
        <span class="label">mediumorchid</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumpurple"></span>
        <span class="label">mediumpurple</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumseagreen"></span>
        <span class="label">mediumseagreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumslateblue"></span>
        <span class="label">mediumslateblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumspringgreen"></span>
        <span class="label">mediumspringgreen</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumturquoise"></span>
        <span class="label">mediumturquoise</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mediumvioletred"></span>
        <span class="label">mediumvioletred</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:midnightblue"></span>
        <span class="label">midnightblue</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mintcream"></span>
        <span class="label">mintcream</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:mistyrose"></span>
        <span class="label">mistyrose</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:moccasin"></span>
        <span class="label">moccasin</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:navajowhite"></span>
        <span class="label">navajowhite</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:navy"></span>
        <span class="label">navy</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:oldlace"></span>
        <span class="label">oldlace</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:olive"></span>
        <span class="label">olive</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:olivedrab"></span>
        <span class="label">olivedrab</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:orange"></span>
        <span class="label">orange</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:purple"></span>
        <span class="label">purple</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:rebeccapurple"></span>
        <span class="label">rebeccapurple</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:red"></span>
        <span class="label">red</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:silver"></span>
        <span class="label">silver</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:teal"></span>
        <span class="label">teal</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:transparent"></span>
        <span class="label">transparent</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:white"></span>
        <span class="label">white</span>
    </div>
    <div class="color-item">
        <span class="color-swatch" style="background-color:yellow"></span>
        <span class="label">yellow</span>
    </div>
</div>

### Creation functions
> These functions create new colors

#### color(value: string): ColorHelper
Creates a color

- Value can be expressed as a named color, a six character hex code, or a three character hex code

```typescript
import { color } from 'typestyle/csx';

var red1 = color('red');
var red2 = color('#FF0000');
var red3 = color('#F00');
```

#### rgb(red: number, green: number: blue: number): ColorHelper
Creates a color from red, green, and blue values

- Red, Green, and Blue are expressed as numbers between 0 and 255

```typescript
import { rgb } from 'typestyle/csx';

const red = rgb(255, 0, 0);
const green = rgb(0, 255, 0);
const blue = rgb(0, 0, 255);
```

#### rgb(red: number, green: number: blue: number, alpha: number | string): ColorHelper
Creates a color from red, green, blue, and alpha values

- Red, Green, and Blue are expressed as numbers between 0 and 255
- Alpha is expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)

```typescript
import { rgba } from 'typestyle/csx';

const red = rgba(255, 0, 0, 1);
const green = rgba(0, 255, 0, '100%');
const blue = rgba(0, 0, 255, 1);
```

#### hsl(hue: number, saturation: number | string: lightness: number | string): ColorHelper
Creates a color from hue, satuation, and lightness 

- Hue is a number between 0 and 360. 
- Saturation and Lightness can be expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)

```typescript
import { hsl } from 'typestyle/csx';

const color1 = hsl(250, .5, .5);
const color1 = hsl(250, '50%', '50%');
```

#### hsla(hue: number, saturation: number | string: lightness: number | string, alpha: number | string): ColorHelper
Creates a color from hue, satuation, lightness, and alpha

- Hue is a number between 0 and 360. 
- Saturation and Lightness can be expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)
- Alpha is expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)

```typescript
import { hsla } from 'typestyle/csx';

const color1 = hsla(250, .5, .5, .5);
const color1 = hsla(250, '50%', '50%', '50%');
```


### Inspection functions
> These functions inspect existing colors and return information about them

#### red(): number
Returns the value of the red component of the color
```typescript
import { rgb } from 'typestyle/csx';

const value = rgb(255, 0, 0).red();
```

#### green(): number
Returns the value of the green component of the color
```typescript
import { rgb } from 'typestyle/csx';

const value = rgb(0, 255, 0).green();
```

#### blue(): number
Returns the value of the blue component of the color
```typescript
import { rgb } from 'typestyle/csx';

const value = rgb(0, 0, 255).blue();
```

#### hue(): number
Returns the hue of the color
```typescript
import { hsl } from 'typestyle/csx';

const value = hsl(120, .5, .5).hue();
```

#### saturation(): number
Returns the saturation of the color
```typescript
import { hsl } from 'typestyle/csx';

const value = hsl(120, .5, .5).saturation();
```

#### lightness(): number
Returns the lightness/luminosity of the color
```typescript
import { hsl } from 'typestyle/csx';

const value = hsl(120, .5, .5).lightness();
```

#### alpha() / opacity(): number
Returns the alpha/opacity of the color
```typescript
import { hsl, rgb } from 'typestyle/csx';

const value1 = hsl(120, .5, .5).opacity();
const value2 = rgb(128, 255, 0).alpha();
```

### Derivative functions
> These functions create a new color based off of an existing one

#### mix(color2: CSSColor, weight?: string | number): ColorHelper
Creates a new color from an existing color and a second color

- color2 can be any type that resolves to a CSSColor (string, ColorHelper, etc.)
- weight is expressed as a string (e.g. '50%') or a number between 0 and 1 (e.g. 0.5)

```typescript
import { rgb } from 'typestyle/csx';

const red = rgb(255, 0, 0);
const blue = rgb(0, 0, 255);
const purple = red.mix(blue, 0.5);
```

#### lighten(amount: number | string): ColorHelper
Creates a lighter color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { red } from 'typestyle/csx';

const red1 = red.lighten('10%');
const red2 = red.lighten(.1);
```

#### darken(amount: number | string): ColorHelper
Creates a darker color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { red } from 'typestyle/csx';

const red1 = red.darken('10%');
const red2 = red.darken(.1);
```

#### saturate(amount: number | string): ColorHelper
Creates a more saturation color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { red } from 'typestyle/csx';

const red1 = red.saturate('10%');
const red2 = red.saturate(.1);
```

#### desaturate(amount: number | string): ColorHelper
Creates a less saturated color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { red } from 'typestyle/csx';

const red1 = red.desaturate('10%');
const red2 = red.desaturate(.1);
```

#### grayscale(): ColorHelper
Creates a grayscale version of the color

```typescript
import { red } from 'typestyle/csx';

const gray = red.grayscale();
```

#### invert(): ColorHelper
Creates the inverse of a color

```typescript
import { red, green, blue } from 'typestyle/csx';

const green = red.invert();
const red = green.invert();
const orange = blue.invert();
```


#### fade(alpha: number | string): ColorHelper
Creates the same color with the specified opacity/alpha

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { red } from 'typestyle/csx';

const red1 = red.fade('50%');
const red2 = red.fade(.5);
```

#### fadeIn(amount: number | string): ColorHelper
Creates a more opaque color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { red } from 'typestyle/csx';

const red1 = red.fadeIn('10%');
const red2 = red.fadeIn(.1);
```

#### fadeOut(amount: number | string): ColorHelper
Creates a more transparent color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { red } from 'typestyle/csx';

const red1 = red.fadeOut('10%');
const red2 = red.fadeOut(.1);
```