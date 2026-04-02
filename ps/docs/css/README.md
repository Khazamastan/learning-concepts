# Mixins Reference

## How Mixins Help
- Encapsulate reusable style fragments.
- Accept arguments for dynamic output (`$background`, `$color`).
- Reduce duplication for focus states and sizing tokens.

## Syntax Basics
```scss
@mixin name($arg: default) {
  // declarations
}
.selector {
  @include name(value);
}
```

## Compilation
Run `sass docs/css/mixins.scss output.css` or configure your build (Vite, Webpack) to process `.scss` files.
