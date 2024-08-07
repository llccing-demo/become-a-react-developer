Become a React Developer

# React Essentials

## Introdution to Web Development

### Core Concepts

user-request -> domain -> DNS -> IP -> Resources -> browser

html/css/js

### History of User Interface (UI)

- jQuery
- Angular
- React
- LitElement


## Mastering React Fundamentals

### Hello React

### Exploring a React Project Directory Structure

**How to create a React Project.**

- Vite, if you are just starting out and learning the React basic but want to build a simple or medium-sized project. 
- Nest.js, if you want a full-stack framework iwth all the bells and whistles, like server components, and you don't mind spending time learing additional concepts.
- Remix, if you are tried Nest.js and find some of its concepts difficult to understand, but staill want to build a full-stack React application.
- Astro, if you have a static or content-driven website,and you don't really need a database or authentication.


link about (init a react project)[https://www.freecodecamp.org/news/how-to-create-a-react-app-in-2024/]

### Meet the first react component

### React JSX

### Lists in React

### Meet Another React component

### React DOM

### React Component Definition

### Handler Function in JSX 

```js
const handleSearchInput = () => {
xxx
}
```

```html
<SearchForm
  searchTerm={searchTerm}
  onSearchInput={handleSearchInput}
  onSearchSubmit={handleSearchSubmit}
/>
```

### React Props

send a props to child component

the `count` is a Prop.
```js
<ChildA count={count} />
```

### React state

here is a sample

```js
const [url, setUrl] = useState("");
```

### Callback handlers in JSX

### Lifting state in react

Lifting state in React is a pattern used to manage and share state between compnents that don't have a direct parent-child relationship. It involves moving the state from a lower-level compnent to a higher-level component in the component tree, typically to the closest common ancestor of the components that need to share teh state.

```js
import React, { useState } from 'react';

// Parent component where state is lifted
function Parent() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <p>Count: {count}</p>
      <ChildA count={count} />
      <ChildB onIncrement={incrementCount} />
    </div>
  );
}

// Child component A that displays the count
function ChildA({ count }) {
  return (
    <div>
      <h2>Child A</h2>
      <p>Count from Parent: {count}</p>
    </div>
  );
}

// Child component B that can increment the count
function ChildB({ onIncrement }) {
  return (
    <div>
      <h2>Child B</h2>
      <button onClick={onIncrement}>Increment Count</button>
    </div>
  );
}

export default Parent;

```

### React Controlled components

### Props handling

```javascript
const List = ({ list, onRemoveItem }) => {
  List.propTypes = {
    list: PropTypes.array,
    onRemoveItem: PropTypes.func,
  };

  if (!list) {
    return null;
  }
  return list.map((item) => (
    <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
  ));
};
```

usage in parent component
```html
 <List list={stories.data} onRemoveItem={handleRemoveStory} />
```

the `list` and `onRemoveItem` are props

### React side-effects

use `useEffect(() => {}, [])`


### React custom hooks

a function which return a array. 

```javascript
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
```

### React fragments

```html
return (
<>
<div></div>
<div></div>
<div></div>
</>
)
```

### Reusable React component

### Explicit Data fetching with react

useCallback, use this callback function, but only recreate it if certain dependencies change.

useReducer, it's like a more powerful version of useState for complex state management.

useState is like a simple piggy bank. You can add money (increment) or take money out (decrement). It's great for simple operations.
useReducer is like a sophisticated bank account. You can do more complex operations like deposits, withdrawals, applying interest, or paying fees. Each of these operations is an "action" that changes the state (balance) of your account.

useCallback is great for performance optimizations, while useReducer shines in managing complex state logic.

### Forms in React

note that, onSumit bind on form element, and button type is submit.

```html
 <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={onSearchInput}
      />
      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
```
