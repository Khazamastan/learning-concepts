# CSS pseudo-class selection

To select every second `<p>` starting from the third one, use `:nth-of-type` with the formula `2n+3`:

```css
p:nth-of-type(2n + 3) {
  background: #ffeeaa;
}
```

Applied to the markup

```html
<div>
  <p>Para 1</p>
  <p>Para 2</p>
  <p>Para 3</p>
  <p>Para 4</p>
  <p>Para 5</p>
  <!-- ... -->
</div>
```

this rule highlights paragraphs 3, 5, 7, and so on.

If other elements can appear between paragraphs, use `:nth-of-type`; if you want to target any element regardless of type, replace it with `:nth-child` and adjust for the actual child structure.
