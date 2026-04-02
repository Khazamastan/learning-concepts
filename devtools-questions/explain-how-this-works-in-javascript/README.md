# Understanding `this`

JavaScript resolves `this` based on *how* a function is called:

| Pattern | Example | Value of `this` |
| --- | --- | --- |
| Simple function call | `show()` | `undefined` in strict/ES modules (otherwise the global object) |
| Method call | `obj.show()` | The object before the dot (`obj`) |
| `call`/`apply` | `show.call(ctx)` | The value passed as the first argument |
| `bind` | `show.bind(ctx)` | Permanently bound to `ctx` |
| Constructor call | `new Show()` | The freshly created instance |
| Arrow function | `() => this` | Lexically captured from the enclosing scope |

The demo script logs these scenarios. Run it via:

```bash
cd explain-how-this-works-in-javascript
node src/index.js
```

You should see:

```
global call undefined
method call object
call binding call
bind bound
arrow undefined
```

(Arrow functions ignore rebinding; they reuse the surrounding `this`, which is `undefined` in an ES module.)
