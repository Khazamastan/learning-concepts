# String Compression & Decompression

Run-length encoding helpers written in JavaScript plus a React playground to test compression/decompression.

## API

```js
import { compress, decompress } from "./compression";

const encoded = compress("aaabcc");
// → "a3bc2"
const original = decompress(encoded);
// → "aaabcc"
```

## Run locally

```bash
cd string-compression-decompression
npm install
npm run dev
```

Visit `http://localhost:5173`, type a string, and compare the encoded/decoded results.
