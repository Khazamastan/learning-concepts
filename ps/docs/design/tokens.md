# Design Tokens Blueprint

## Token Categories
- **Color** – `color.background.surface`, `color.text.primary`, `color.accent.default`.
- **Typography** – `font.family.sans`, `font.size.md`, `lineheight.tight`.
- **Spacing** – `space.xs`, `space.sm`, `space.md` (4px modular scale).
- **Radius** – `radius.sm`, `radius.lg`.
- **Shadow** – `shadow.level1`, `shadow.level2`.

## Example Token Source (JSON)
```json
{
  "color": {
    "background": { "surface": { "value": "#ffffff" } },
    "accent": { "default": { "value": "#2563eb" } }
  },
  "space": {
    "sm": { "value": "8px" },
    "md": { "value": "16px" }
  }
}
```

## Export to CSS Custom Properties
```css
:root {
  --color-accent-default: #2563eb;
  --space-sm: 8px;
  --space-md: 16px;
}
```

## Workflow Recommendations
1. Use [Style Dictionary](https://amzn.github.io/style-dictionary) or Theo to transform tokens to multiple platforms (CSS, Android XML, iOS Swift).
2. Version tokens like code; review changes via pull requests and visual diffing.
3. Document usage in Storybook or a design system site so teams know when to apply each token.
4. Support theming by scoping tokens under `.theme-dark` or data attributes.
