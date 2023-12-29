---
title: "React Context"
date: "2023-12-29"
---

## What is React Context

## The problem that React Context Solves

## The Consumer, The Provider

A consumer is any part of your code where the `useContext()` function is being used.

## Default Values on Providers

## How to avoid the annoying process of using Typescript and Context together without a Default Value

The way to avoid the problem with the default value with the `createContext()` function, is by also passing an undefined as a possible type for the createContext template.

```ts
const CountStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);
```

## Example

## useContext() hook

You might be asking, _but Rowan, how this looks on a React Application?_... Glad you asked!

```js
import { useContext } from "react";
import { SomeContext } from "./some-context.js";

function myComponent() {
  const something = useContext(SomeContext);
}
```

## useReducer() hook

This `useReducer()` hook is a hook that receives a reducer and a state. Here is a way to use it.

```jsx
import { createContext, useReducer } from "react";
const CountContext = createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count + 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CountProvider({ children }) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const value = { state, dispatch };
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export { CountProvider };
```

Remember, a _Reducer_ is a function that receives an state and an action, and it produces a new state based on the action specified.

See how we can get the state and the dispatch function from the `useReducer()` hook.

## Reducers in React???

## useContext() and useReducer()
