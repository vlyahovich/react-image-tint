![ReactImageTint](tint.png)

# React Image Tint
A React component that applies tint to image.

# Usage

```js
import { ReactImageTint } from 'react-image-tint';

export function myTint() {
    return <ReactImageTint src="%source_to_image%" color="#FF404C" />;
}
```

# Options

- **src** - 
Source path to image. Url or uri.

- **color** - 
HEX color like `#FF404C`.

# Additional Functions

- If you have `[colorful]` keyword with braces in image url, then it won't apply tint.
- Make sure you have proper `Access-Control-Allow-Origin` header enabled if you load images from other domains