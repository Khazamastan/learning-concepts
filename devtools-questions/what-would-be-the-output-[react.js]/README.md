# Batched `setState` example

```jsx
class App extends React.Component {
  state = {
    items: [],
  };

  handleClick = () => {
    const { items } = this.state;
    this.setState({
      items: [...items, "apple"],
    });
    this.setState({
      items: [...items, "orange"],
    });
    this.setState({
      items: [...items, "mango"],
    });
    this.setState({
      items: [...items, "peach"],
    });
  };

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        {items.length ? (
          <h2> Items are {JSON.stringify(items)} </h2>
        ) : (
          <>
            <p> No items found </p>
            <button onClick={this.handleClick}> Add items </button>
          </>
        )}
      </div>
    );
  }
}
```

## Output after clicking the button

```
Items are ["peach"]
```

## Explanation

- React batches state updates triggered inside the same event handler.
- Each `setState` call reads `this.state.items` **before** any updates are applied, so every call spreads the same original (empty) array.
- The batched updates apply sequentially, with each assignment overwriting the previous one. The final call wins, leaving the array as `["peach"]`.
- Use the functional form (`this.setState(prev => ({ items: [...prev.items, "apple"] }))`) to accumulate updates based on the latest state snapshot.
