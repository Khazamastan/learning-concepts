# HTMLCollection vs NodeList

## Browser code

```html
<ul id="items">
  <li>One</li>
  <li>Two</li>
</ul>
<script>
  const list = document.getElementsByTagName("li");
  const nodes = document.querySelectorAll("li");

  const extra = document.createElement("li");
  extra.textContent = "Three";
  document.getElementById("items").appendChild(extra);

  console.log(list.length); // ?
  console.log(nodes.length); // ?
</script>
```

## Output

```
3
2
```

## Explanation

- `getElementsByTagName` returns a live `HTMLCollection` that reflects DOM changes immediately, so the appended `<li>` increases its length.
- `querySelectorAll` returns a static `NodeList`; its contents stay frozen at the time of the query.

The accompanying `src/index.js` simply prints the expected lengths so you can verify the numbers without a browser.
