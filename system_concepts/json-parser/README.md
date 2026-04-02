# JSON Parser Concept Guide

## Concept Overview
A JSON parser converts JSON text (per RFC 8259/ECMA-404) into in-memory data structures. Parsing involves lexical analysis (tokenizing strings, numbers, literals) and syntactic analysis (handling objects, arrays, values). Parsers must handle escape sequences, Unicode surrogate pairs, floating-point numbers, and error reporting for malformed input.

## Real-World Usage
- **Programming Language Runtimes:** Native parsers in Python (`json`), Go (`encoding/json`), and JavaScript (`JSON.parse`) power configuration loading and API clients.
- **Streaming Pipelines:** Streaming parsers (SAX-style) process large JSON logs without loading entire documents into memory.
- **Security Tools:** Validators ensure JSON-based webhooks or JWT payloads conform to schemas and avoid malicious content.

## Architecture Highlights
1. **Tokenization:** Recognize structural characters (`{}`, `[]`, `,`, `:`), literals (`true`, `false`, `null`), numbers, and strings while handling whitespace skipping.
2. **Grammar:** Recursive descent or LL(1) parsing suffices because JSON grammar is simple and unambiguous.
3. **Error Handling:** Provide descriptive error messages with line/column positions when encountering invalid tokens.
4. **Performance:** Streaming and incremental parsing reduce memory footprint; double-buffered I/O can improve throughput.

## Included Working Example (Node.js)
The `example.js` script implements a minimal recursive-descent JSON parser without relying on Node's built-in parser. It exposes a CLI:

```bash
node example.js --file sample.json
node example.js --expression '{"hello": [1, 2, 3]}'
```

The parser reports syntax errors with offsets and pretty-prints the parsed result.

## React 19 Interactive Demo
`example.jsx` parses JSON directly in the browser to demonstrate error handling:

```jsx
import JsonParserDemo from "./json-parser/example.jsx";

export default function App() {
  return <JsonParserDemo />;
}
```

It provides a simple interface to test structurally valid and invalid JSON payloads.

## Learning Checklist
- Add streaming support that yields tokens lazily for large documents.
- Implement a JSON serializer to convert Python objects back to JSON text.
- Integrate JSON Schema validation to enforce document structure.

## References
- RFC 8259 – The JavaScript Object Notation (JSON) Data Interchange Format: https://www.rfc-editor.org/rfc/rfc8259
- ECMA-404 – The JSON Data Interchange Syntax: https://www.ecma-international.org/publications-and-standards/standards/ecma-404/
- Parsing JSON is a Minefield (article): https://seriot.ch/projects/parsing_json.html
