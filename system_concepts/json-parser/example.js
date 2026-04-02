#!/usr/bin/env node
/**
 * Minimal recursive-descent JSON parser in Node.js (no JSON.parse).
 */
import fs from "node:fs";
import process from "node:process";

class JSONParseError extends Error {
  constructor(message, position) {
    super(`${message} at position ${position}`);
  }
}

class Cursor {
  constructor(text) {
    this.text = text;
    this.index = 0;
  }
  peek() {
    return this.index < this.text.length ? this.text[this.index] : null;
  }
  advance(count = 1) {
    this.index += count;
  }
  remaining() {
    return this.text.slice(this.index);
  }
}

class JSONParser {
  constructor(text) {
    this.cursor = new Cursor(text);
  }
  parse() {
    const value = this.parseValue();
    this.skipWhitespace();
    if (this.cursor.peek() !== null) {
      throw new JSONParseError("Extra data after JSON document", this.cursor.index);
    }
    return value;
  }
  parseValue() {
    this.skipWhitespace();
    const ch = this.cursor.peek();
    if (ch === null) throw new JSONParseError("Unexpected end of input", this.cursor.index);
    if (ch === '"') return this.parseString();
    if (ch === "{") return this.parseObject();
    if (ch === "[") return this.parseArray();
    if ("-0123456789".includes(ch)) return this.parseNumber();
    if (this.cursor.remaining().startsWith("true")) {
      this.cursor.advance(4);
      return true;
    }
    if (this.cursor.remaining().startsWith("false")) {
      this.cursor.advance(5);
      return false;
    }
    if (this.cursor.remaining().startsWith("null")) {
      this.cursor.advance(4);
      return null;
    }
    throw new JSONParseError(`Unexpected character '${ch}'`, this.cursor.index);
  }
  parseObject() {
    const obj = {};
    this.expect("{");
    this.skipWhitespace();
    if (this.cursor.peek() === "}") {
      this.cursor.advance();
      return obj;
    }
    while (true) {
      this.skipWhitespace();
      const key = this.parseString();
      this.skipWhitespace();
      this.expect(":");
      obj[key] = this.parseValue();
      this.skipWhitespace();
      const ch = this.cursor.peek();
      if (ch === "}") {
        this.cursor.advance();
        break;
      }
      if (ch === ",") {
        this.cursor.advance();
        continue;
      }
      throw new JSONParseError("Expected ',' or '}' in object", this.cursor.index);
    }
    return obj;
  }
  parseArray() {
    const arr = [];
    this.expect("[");
    this.skipWhitespace();
    if (this.cursor.peek() === "]") {
      this.cursor.advance();
      return arr;
    }
    while (true) {
      arr.push(this.parseValue());
      this.skipWhitespace();
      const ch = this.cursor.peek();
      if (ch === "]") {
        this.cursor.advance();
        break;
      }
      if (ch === ",") {
        this.cursor.advance();
        continue;
      }
      throw new JSONParseError("Expected ',' or ']' in array", this.cursor.index);
    }
    return arr;
  }
  parseString() {
    this.expect('"');
    const result = [];
    while (true) {
      const ch = this.cursor.peek();
      if (ch === null) throw new JSONParseError("Unterminated string", this.cursor.index);
      if (ch === '"') {
        this.cursor.advance();
        return result.join("");
      }
      if (ch === "\\") {
        this.cursor.advance();
        const escaped = this.cursor.peek();
        if (escaped === null) throw new JSONParseError("Unterminated escape sequence", this.cursor.index);
        this.cursor.advance();
        switch (escaped) {
          case '"':
          case "\\":
          case "/":
            result.push(escaped);
            break;
          case "b":
            result.push("\b");
            break;
          case "f":
            result.push("\f");
            break;
          case "n":
            result.push("\n");
            break;
          case "r":
            result.push("\r");
            break;
          case "t":
            result.push("\t");
            break;
          case "u": {
            const hex = this.cursor.remaining().slice(0, 4);
            if (hex.length < 4 || !/^[0-9a-fA-F]{4}$/.test(hex)) {
              throw new JSONParseError("Invalid Unicode escape", this.cursor.index);
            }
            result.push(String.fromCharCode(parseInt(hex, 16)));
            this.cursor.advance(4);
            break;
          }
          default:
            throw new JSONParseError(`Invalid escape character '${escaped}'`, this.cursor.index);
        }
      } else {
        result.push(ch);
        this.cursor.advance();
      }
    }
  }
  parseNumber() {
    const start = this.cursor.index;
    if (this.cursor.peek() === "-") this.cursor.advance();
    if (this.cursor.peek() === "0") {
      this.cursor.advance();
    } else {
      this.consumeDigits();
    }
    if (this.cursor.peek() === ".") {
      this.cursor.advance();
      if (!this.consumeDigits()) throw new JSONParseError("Expected digits after decimal point", this.cursor.index);
    }
    if (["e", "E"].includes(this.cursor.peek())) {
      this.cursor.advance();
      if (["+","-"].includes(this.cursor.peek())) this.cursor.advance();
      if (!this.consumeDigits()) throw new JSONParseError("Expected digits in exponent", this.cursor.index);
    }
    const numberText = this.cursor.text.slice(start, this.cursor.index);
    const numberValue = Number(numberText);
    if (Number.isNaN(numberValue)) {
      throw new JSONParseError("Invalid number", start);
    }
    return numberValue;
  }
  consumeDigits() {
    let consumed = false;
    while (this.cursor.peek() !== null && /\d/.test(this.cursor.peek())) {
      this.cursor.advance();
      consumed = true;
    }
    return consumed;
  }
  expect(ch) {
    if (this.cursor.peek() !== ch) throw new JSONParseError(`Expected '${ch}'`, this.cursor.index);
    this.cursor.advance();
  }
  skipWhitespace() {
    while (this.cursor.peek() !== null && /\s/.test(this.cursor.peek())) {
      this.cursor.advance();
    }
  }
}

function parseJson(text) {
  const parser = new JSONParser(text);
  return parser.parse();
}

function main() {
  const args = process.argv.slice(2);
  const fileIndex = args.indexOf("--file");
  const exprIndex = args.indexOf("--expression");
  if (fileIndex === -1 && exprIndex === -1) {
    console.error("Usage: node example.js --file <path> | --expression '<json>'");
    process.exit(1);
  }
  const source =
    fileIndex >= 0
      ? fs.readFileSync(args[fileIndex + 1], "utf8")
      : args[exprIndex + 1] ?? "";
  try {
    const result = parseJson(source);
    console.log("Parsed value:");
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
