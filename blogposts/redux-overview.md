---
title: "Redux Overview"
date: "2023-12-21"
---

## What is Redux?

Redux is a state container / state manager for JavaScript Apps created by Dan Abramov (the same Software Engineer that created React.js)

## What is the FLUX architecture?

The FLUX architecture is something that Facebook software engineers talked about in a a React Conference in 2014, where they faced problems regarding the source of truth of the application.

Then they went initially with this architecture, which consisted in a store, dispatch, views and actions.

[Learn more here: http://fluxxor.com/what-is-flux.html](http://fluxxor.com/what-is-flux.html)

## What is a state manager?

A state manager is an object tree (tree data structure holding objects at the nodes)

## What is a store?

The **store** is an object that contains the application logic and a couple of methods to use, like `getState()`, `dispatch()`, and `subscribe()`

## What is a reducer function?

A reducer function takes 2 arguments:

- Current State Object: Current state of the app
- Action Object: Describes what happened with the state of the app

The function signature looks like this:

```js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    default:
      return state;
  }
}
```

As you can see, the state is an object with the value property, and value 0. That reducer takes an action (that usually is a string) which then is used to determine what the state should look like.

If we pass the 'counter/incremented' as the action, the value property will increase by 1.

So the purpose of the reducer is to not change the state of the app directly, but instead return a new state with the modifications already applied.

## Rules of Reducers

The reducers must follow 3 rules:

- It can only determine the next state based on the state and action arguments.
- It cannot have any type of async logic, or logic that could cause a side-effect.
- They are not allowed to mutate the state directly, every update must be immutable; meaning; you must return a new state object.

## What is a dispatch function?

Dispatch is a method from the store that receives an object describing the action that happened, this gets sent to the store and then the reducer is used to determine the next state of the app.

## What is a Selector?

A selector is basically a function that receives the state as an argument, and then it returns a specific property from the state.

Let's supose we have a store with a counter, which is accessed by state.value

```js
const selectCounterValue = (state) => state.value;

const counterValue = selectCounterValue(store.getState());
```

Remember, a `store.getState()` returns the state property of the store.

## What is an action?

Is a JS object describing what happened to the state.

## What is an action creator?

An action creator is basically a function that creates/returns actions, it receives a payload so basically we don't need to define the action objects everytime.

```js
const addTodo = (text) => {
  return {
    action: "ADD_TODO",
    payload: text,
  };
};
```

## What is a slice?

Slice is something from Redux Toolkit, which includes this new feature to have multiple states and reducers.

## Why do we care about the immutability in the state of an app?

If we have structures that are mutable, that could cause unreliability of the application.

## Why we have state managers?

As the application grows and becomes more complex, data communication between components get more difficult to maintain.
See this example:

(insert example of a file hierarchy system)

If we use plain react, passing data to the `<Button/>` component, would require us to perform something called **PropDrilling** which means passing props down to other components via JSX attributes.

The problem is that when an app grows larger, and more components need to know about each other, then that means that the state naturally will translate to the root or near the root of the app, to be specific, the app state (object that stores variables and their values) will naturally be moved to the earliest common shared layout.

This causes the development experience to be less enjoyable, since there will be prop drilling in certain components that are there just for the sake of being there, and they are not passing those props to the end component which will actually show it or use it.

## What is Redux Toolkit?

Redux Toolkit (also stands for RTK) is the official package that the Redux team recomends JS developers to use since it include functions more utilities to write JavaScript applications that uses state managers.

## It is recommended to use Redux?

It depends. It is more about necessity rather than obligation. If your app is substancially big, and you're seeing yourself prop drilling too much, and your code being non-intentional or very ugly, probably your project is a candidate for Redux.

## Pure Functions vs Impure Functions

Pure functions only relies on the arguments, therefore its return is always the same.

Impure functions are affected by side effects (network, db connections, etc...) so the result is not always the same.

Reducers must be PURE FUNCTIONS.

## Redux Principles

- All Application State is represented by a Single JavaScript Object, called State or State Tree
- State Tree is Readonly, you cannot write to it, the only way to change it is by dispatch an action with a new state object
- The reducer takes the current state, and an action describing what it happened to the state, and then it returns a new state.

Example of a simple reducer:

```js
const counter = (state = 0, action) => {
  switch (action) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state + 1;
    default:
      return state;
  }
};
```

When using Redux, you will pass this ^ reducer function to the store, through the createStore method

```js
import { createStore } from "redux";
// Our Reducer
const counter = (state = 0, action) => {
  switch (action) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state + 1;
    default:
      return state;
  }
};
// Supposing we have redux installed via NPM
const store = createStore(counter); // We pass the reducer, remember a reducer is a function that receives a state and an action, and it returns a new state object
```

## What does it mean to subscribe?

Oxford Languages defines it as: Receive something regularly...
In this case, Redux store contains a .subscribe method which basically is a calback that runs everytime that there is a state change.

```js
import { createStore } from "redux";

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state + 1;
    default:
      return state;
  }
};

const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
```

That `.getState()` method gets the state of the application.
That `.dispatch()` methods returns a new state object, it receives the action.

_To Do: How would you implement a subscription in JavaScript without any frameworks?
Own implementation of the createStore() method_

```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  // I still don't understand this.
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // This will be executed once, when the createStore() function is created.
  dispatch({});

  return { getState, dispatch, subscribe };
};
```

`createStore()` returns the store, which is basically the collection of 3 functions.

## RTK Query

This is basically a data fetching and caching solution, as React query is.

// Talk more about RTK

## Why RTK was created?

RTK == Redux Tool Kit

Redux Toolkit was created with the objective of reducing the boilerplate code and tu provide functions that simplify common Redux tasks.

Part of the problematic that RTK solves is that Redux EXPECTS that you handle immutability, which in much cases, a lot of JS devs don't do.

Redux Toolkit contains 2 methods that are very important:

- configurateStore(): sets up a well-configured Redux store with a single function call, including combining reducers, adding the thunk middleware
- createSlice(): allows you to write reducers, and it also takes care of the immutability aspect of things using Immer.js, which is a library that handles immutability and allows you to write mutable code and then transform it to immutable.

## Difference between using Redux and Redux Toolkit:

See how creating the slice simplifies a lot of things.

In the reducers object in RTK, you pass the action directly as a function, where in redux, you define those action funcions outside the reducer.

See how you need to create the reducer in the normal Redux, but in RTK by creating a slice, you're able to pass the name of the slice and define an initial state.

Then you only need to export from the slice, and not export 3 different things separately as the right example.
And once you create your slice, you pass it to the reducers object in the configureStore() method

```js
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
});
```

### Advanced Topics:

- Action Creators
- Mutations
- Normalized State
- Memoization
- combineReducers
- applyMiddleware
- compose
- Thunks
- RTK Query
- Redux-Saga

#### Further Resources:

- Redux FAQ: [https://redux.js.org/faq](https://redux.js.org/faq)
- Egghead.io Free Redux Course by Dan Abramov: [https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867)
- Educative.io Free Redux Course: [https://www.educative.io/courses/practical-redux/introduction-to-the-course](https://www.educative.io/courses/practical-redux/introduction-to-the-course)
- Blog Series about Redux: [https://blog.isquaredsoftware.com/series/practical-redux/](https://blog.isquaredsoftware.com/series/practical-redux/)
- Tao of Redux Part 1: [https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/)
- Tao of Redux Part 2: [https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-2/](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-2/)
