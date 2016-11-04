TypeStyle comes with several color functions to make styling as simple as possible. Many of these are inspired by modern CSS Preprocessors. 

### Named Colors
> TypeStyle comes with definitions for all major named colors in CSS.  Each of these ColorHelpers can be used anywhere a a CSSColor can be used.

```typescript
  import { aliceblue, antiquewhite, aqua, aquamarine, azure, beige, bisque, black, blanchedalmond, blue
 , blueviolet, brown, burlywood, cadetblue, chartreuse, chocolate, coral, cornflowerblue, cornsilk
 , crimson, cyan, darkblue, darkcyan, darkgoldenrod, darkgray, darkgreen, darkgrey, darkkhaki
 , darkmagenta, darkolivegreen, darkorange, darkorchid, darkred, darksalmon, darkseagreen
 , darkslateblue, darkslategray, darkslategrey, darkturquoise, darkviolet, deeppink, deepskyblue
 , dimgray, dimgrey, dodgerblue, firebrick, floralwhite, forestgreen, fuchsia, gainsboro
 , ghostwhite, gold, goldenrod, gray, green, greenyellow, grey, honeydew, hotpink, indianred
 , indigo, ivory, khaki, lavender, lavenderblush, lawngreen, lemonchiffon, lightblue, lightcoral
 , lightcyan, lightgoldenrodyellow, lightgray, lightgreen, lightgrey, lightpink, lightsalmon
 , lightseagreen, lightskyblue, lightslategray, lightslategrey, lightsteelblue, lightyellow, lime
 , limegreen, linen, maroon, mediumaquamarine, mediumblue, mediumorchid, mediumpurple, mediumseagreen
 , mediumslateblue, mediumspringgreen, mediumturquoise, mediumvioletred, midnightblue, mintcream
 , mistyrose, moccasin, navajowhite, navy, oldlace, olive, olivedrab, orange, purple
  , rebeccapurple, red, silver, teal, transparent, white, yellow } from 'typestyle/csx';
```

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