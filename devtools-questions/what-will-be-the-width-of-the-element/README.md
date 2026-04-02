# Box model calculation

Given

```css
.container {
  width: 100px;
  height: 100px;
  padding: 30px;
  border: 30px solid lightblue;
  margin: 30px;
}
```

## Answer

- **Content width**: `100px`
- **Total rendered width** (content + padding + border): `100 + 30 + 30 + 30 + 30 = 220px`
- Margins (`30px` on each side) add spacing outside the box but are not part of the element’s own width.

To keep the visible width at `100px`, enable the alternate box model:

```css
.container {
  box-sizing: border-box;
}
```

This causes padding and border to be included within the declared `width`.
