Color management in a large project is always a challenge.  With this in mind, TypeStyle (csx) comes with SASS/LESS/Stylus inspired color functions to make styling simple and reusable.

> Values from these `csx` utilities need to be `toString`ed before being used in TypeStyle or any other library. This means that they can be used with or without TypeStyle 🌹

Here are some of the things you can do:

---
## Create New Colors

### color(value: string): ColorHelper
Creates a new color from a string

- Can be a six character hex code, a three character hex code, or a CSS color function

```typescript
import { color } from 'csx';
 
var red2 = color('#FF0000');
var red3 = color('#F00');
var red4 = color('rgb(255,0,0)');
var red5 = color('rgba(255,0,0,1)');
var red6 = color('hsl(0,100%,50%)');
var red7 = color('hsl(0,100%,50%,1)');
```

### hsl(hue: number, saturation: number | string: lightness: number | string): ColorHelper
Creates a color from hue, saturation, and lightness 

- Hue is a number between 0 and 360. 
- Saturation and Lightness can be expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)

```typescript
import { hsl } from 'csx';

const color1 = hsl(250, .5, .5);
const color1 = hsl(250, '50%', '50%');
```

### hsla(hue: number, saturation: number | string: lightness: number | string, alpha: number | string): ColorHelper
Creates a color from hue, saturation, lightness, and alpha

- Hue is a number between 0 and 360. 
- Saturation and Lightness can be expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)
- Alpha is expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)

```typescript
import { hsla } from 'csx';

const color1 = hsla(250, .5, .5, .5);
const color1 = hsla(250, '50%', '50%', '50%');
```

### rgb(red: number, green: number: blue: number): ColorHelper
Creates a color from red, green, and blue values

- Red, Green, and Blue are expressed as numbers between 0 and 255

```typescript
import { rgb } from 'csx';

const red = rgb(255, 0, 0);
const green = rgb(0, 255, 0);
const blue = rgb(0, 0, 255);
```

### rgba(red: number, green: number: blue: number, alpha: number | string): ColorHelper
Creates a color from red, green, blue, and alpha values

- Red, Green, and Blue are expressed as numbers between 0 and 255
- Alpha is expressed as a string (e.g. '10%') or as a number between 0 and 1 (e.g. 0.1)

```typescript
import { rgba } from 'csx';

const red = rgba(255, 0, 0, 1);
const green = rgba(0, 255, 0, '100%');
const blue = rgba(0, 0, 255, 1);
```

---
## Convert to String

### toHexString(): string
Returns a string with the RGB Hex code (e.g. black = #000000).  Useful when supporting a legacy browser.
```typescript
import { color } from 'csx';

color('#FFF').toHexString(); // #FFFFFF
```

### toString(): string
Returns a string representing the color in its current color space.  Hex color codes are automatically output as rgb()
```typescript
import { hsla, rgba } from 'csx';

rgba(0, 0, 0, .5).toString(); // rgba(0, 0, 0, 50%)
hsla(0, 0, 0, .5).toString(); // hsla(0, 0, 0, 50%)
```

---
## Changing Color Space / Format

### toHSL(): string
Converts to the **H**ue **S**aturation **L**ightness color space
```typescript
import { color } from 'csx';

// outputs hsl(0,100%,50%)
const red = color('rgb(255,0,0)').toHSL().toString();
```

### toHSLA(): string
Converts to the **H**ue **S**aturation **L**ightness color space with an **A**lpha channel
```typescript
import { color, rgb } from 'csx';

// outputs hsla(0,100%,50%,1)
const red = rgb(255, 0, 0).toHSLA().toString();
```

### toRGB(): string
Converts to the **R**ed **G**reen **B**lue color space
```typescript
import { color } from 'csx';

// outputs rgb(255,0,0)
const red = color('hsl(0,100%,50%)').toRGB().toString();
```

### toRGBA(): string
Converts to the **R**ed **G**reen **B**lue color space with an **A**lpha channel
```typescript
import { color } from 'csx';

// outputs rgba(255,0,0,1)
const red = hsl(0, 1, .5).toRGBA().toString();
```

---
## Create a New Colors From Other Colors

### darken(amount: number | string, relative?: boolean): ColorHelper
Creates a darker color
- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const red1 = red.darken('10%');
const red2 = red.darken(.1);
```

### desaturate(amount: number | string, relative?: boolean): ColorHelper
Creates a less saturated color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const red1 = red.desaturate('10%');
const red2 = red.desaturate(.1);
```

### fade(alpha: number | string): ColorHelper
Creates the same color with the specified opacity/alpha

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const red1 = red.fade('50%');
const red2 = red.fade(.5);
```

### fadeIn(amount: number | string, relative?: boolean): ColorHelper
Creates a more opaque color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const red1 = red.fadeIn('10%');
const red2 = red.fadeIn(.1);
```

### fadeOut(amount: number | string, relative?: boolean): ColorHelper
Creates a more transparent color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const red1 = red.fadeOut('10%');
const red2 = red.fadeOut(.1);
```

### grayscale(): ColorHelper
Creates a grayscale version of the color

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const gray = red.grayscale();
```

### invert(): ColorHelper
Creates the inverse of a color

```typescript
import { color } from 'csx';

const green = color('#FFF').invert(); 
```

### lighten(amount: number | string): ColorHelper
Creates a lighter color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const red1 = red.lighten('10%');
const red2 = red.lighten(.1);
```

### mix(color2: CSSColor, weight?: string | number): ColorHelper
Creates a new color from an existing color and a second color

- color2 can be any type that resolves to a CSSColor (string, ColorHelper, etc.)
- weight is expressed as a string (e.g. '50%') or a number between 0 and 1 (e.g. 0.5)

```typescript
import { rgb } from 'csx';

const red = rgb(255, 0, 0);
const blue = rgb(0, 0, 255);
const purple = red.mix(blue, 0.5);
```

### saturate(amount: number | string, relative?: boolean): ColorHelper
Creates a more saturation color

- amount can be a string (e.g. '10%') or a number between 0 and 1 (e.g. 0.1)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const red1 = red.saturate('10%');
const red2 = red.saturate(.1);
```

### shade(weight: number): ColorHelper
It darkens the color by mixing black into it.  It is the same as black.mix(color, weight).

- weight is expressed as a number between 0 and 1 (e.g. 0.5)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const darkerRed = red.shade(0.5);
```

### spin(degrees: number): ColorHelper
Shifts the hue around the color wheel by a certain number of positive or negative degrees

- degrees is expressed as a number between -360 to 360.  Values above or below that range will be wrapped around (e.g. 480 is the same as 120, -480 is the same as -120).

```typescript
import { color, spin } from 'csx'; 

const red = color('#FF0000');
const green = red.spin(120);
const blue = green.spin(120);
const redAgain = blue.spin(120);
```

### tint(weight: number): ColorHelper
It lightens the color by mixing white into it.  It is the same as white.mix(color, weight).

- weight is expressed as a number between 0 and 1 (e.g. 0.5)

```typescript
import { color } from 'csx';

const red = color('#FF0000');
const lighterRed = red.tint(0.5);
```



---
## Inspect Colors

### red(): number
Returns the value of the red component of the color
```typescript
import { rgb } from 'csx';

const value = rgb(255, 0, 0).red(); // 255
```

### green(): number
Returns the value of the green component of the color
```typescript
import { rgb } from 'csx';

const value = rgb(0, 255, 0).green(); // 255
```

### blue(): number
Returns the value of the blue component of the color
```typescript
import { rgb } from 'csx';

const value = rgb(0, 0, 255).blue(); //255
```

### hue(): number
Returns the hue of the color
```typescript
import { hsl } from 'csx';

const value = hsl(120, .5, .5).hue(); // 120
```

### saturation(): number
Returns the saturation of the color
```typescript
import { hsl } from 'csx';

const value = hsl(120, .5, .5).saturation(); // 0.5
```

### lightness(): number
Returns the lightness/luminosity of the color
```typescript
import { hsl } from 'csx';

const value = hsl(120, .5, .5).lightness(); // O.5
```

### alpha() / opacity(): number
Returns the alpha/opacity of the color
```typescript
import { hsl, rgb } from 'csx';

const value1 = hsl(120, .5, .5).opacity(); // 1
const value2 = rgb(128, 255, 0).alpha();   // 1
```
