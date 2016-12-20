 TypeStyle (csx) includes utilities that make using units and css functions feel natural and flow in JavaScript

## Unit utilities

### em(value: number): string
Returns the number followed by the em unit

```typescript
import { em } from 'csx';

// outputs '0.5em'
const width = em(.5);
```

### percent(value: number): string
Returns the number followed by the % unit

```typescript
import { percent } from 'csx';

// outputs '50%'
const width = percent(50);
```

### px(value: number): string
Returns the number followed by the px unit

```typescript
import { px } from 'csx';

// outputs '42px'
const width = px(42);
```

### rad(value: number): string
Returns the number followed by the rad unit

```typescript
import { rad } from 'csx';

// outputs '20rad'
const rotation = rad(20);
```

### rem(value: number): string
Returns the number followed by the rem unit

```typescript
import { rem } from 'csx';

// outputs '1.5rem'
const width = rem(1.5);
```

### viewHeight(value: number): string
Returns the number followed by the vh (view height) unit

```typescript
import { viewHeight } from 'csx';

// outputs '25vh'
const height = viewHeight(100/4);
```

### viewWidth(value: number): string
Returns the number followed by the vw (view width) unit

```typescript
import { viewWidth } from 'csx';

// outputs '85vw'
const width = viewWidth(85);
```

### turn(value: number): string
Returns the number followed by the turn unit

```typescript
import { turn } from 'csx';

// outputs '1turn'
const rotation = turn(1);
```


## Function utilities

### important(value: string): string

Returns the string followed by !important

```typescript
import { important } from 'csx';

// outputs 'red !important'
const content = important('red');
```

### quote(value: string): string

Returns the string wrapped by quote().  Single quotes in the value are escaped 

```typescript
import { quote } from 'csx';

// outputs "quote('&amp;')"
const content = quote('&amp;');

// outputs "quote('It\'s the cat\'s pajamas')"
const content1 = quote("It's the cat's pajamas");
```

### url(value: string): string

Returns the url wrapped by url()

```typescript
import { url } from 'csx';

// outputs "url(images/my-background.png)"
const imageLocation = url('images/my-background.png');
```