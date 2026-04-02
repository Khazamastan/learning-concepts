# Capturing vs bubbling

## Markup

```html
<div id="grandfather">
  <div id="father">
    <button id="child">Click Me</button>
  </div>
</div>

<script>
  function bindEvent(id) {
    document
      .getElementById(id)
      .addEventListener(
        "click",
        (e) => console.log(e.target.getAttribute("id")),
        true
      );
  }

  bindEvent("grandfather");
  bindEvent("father");
  bindEvent("child");
</script>
```

## Output

```
child
child
child
```

## Explanation

- Every listener runs in the **capturing** phase because the third argument is `true`.
- `event.target` always references the original element that dispatched the event (`#child`), regardless of which ancestor is handling it.
- To log the element whose handler is executing, use `event.currentTarget` instead.
