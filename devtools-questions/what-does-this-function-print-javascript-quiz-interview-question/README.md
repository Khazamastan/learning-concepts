# What does this function print?

## Code

```js
function addIndex(list = []) {
  list.push(list.length);
  console.log(list.slice());
  return list;
}

const first = addIndex();
addIndex(first);
```

## Output

```
[ 0 ]
[ 0, 1 ]
```

## Explanation

The default parameter `list = []` is evaluated on each call. The first call uses the fresh default array, pushes its length (`0`), logs `[0]`, and returns it. The second call reuses the returned array (`first`), so pushing `list.length` (currently 1) produces `[0, 1]`.
