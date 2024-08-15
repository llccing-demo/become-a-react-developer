# Deep Dive into React Hooks

React hooks are powerful functions that enable functional components to manage state, life cycle events, and other functionalities traditionally handled by class components.

## Introducing the Function Component

### Building an App with components
### Introducing the function component

one-way data flow.

props and callbacks

### Writing a Function Component
### Challenge: multi-stage Navbar 

## Crafting states in functions

## Hooking into React

Fiber in React refers to the internal reconciliation algorithm introduced in React 16. It's a complete rewrite of React's core algorithm, designed to improve performance and enable new features.

Fiber, includes two parts, WorkInProgress and Current.

## Use state to jumpstaart compnents

why the hook return an array rather than an object. 
it's easy to destructure the array. you don't need to remember the name in the object.

## use Effect to handle side effects

This highlights an important aspect of React's design: if our parent has it, we can have it. This is one of the most basic and effective behaviors we rely on when designing a React app.

The most common type of effect in React is the mutation effect, which is implemented using the useEffect hook. This is used for side effects that don't need to block the browser from updating the screen.

Layout effects are similar to mutation effects, but they run synchronously immediately after React has performed all DOM mutations. This can be useful when you need to make DOM measurements or update the DOM in a way that's visually observable to the user.

Passive effects are not a built-in React feature, but rather a concept introduced with React 18's concurrent rendering. They represent effects that don't require immediate execution and can be deferred.

With the introduction of useEffect in React 18, effects are now passive by default. This means React may delay the execution of the effect to avoid blocking the main thread.

## use Memo to boost performance

useMemo hook that allows us to reuse the previous assignment in an update.

## use Context to cover an area

## use Ref to hide stuff

## use Custom hooks to reuse logic 
