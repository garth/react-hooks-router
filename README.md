# react-hooks-router

A react hooks approach to routing.

This library is a simple wrapper around page.js.

## Install

```
yarn add react-hooks-router
```

or

```
npm install react-hooks-router
```

## Define Routes

```js
import { route } from 'react-hooks-router'

export const routes = {
  user: (params: { id: string }) => route('/user/:id', params),
  faq: '/faq',
  login: '/login',
  notFound: '*'
}
```

## Use The Hook

```tsx
import React, { useState } from 'react'
import { routes } from './routes'
import { useRouter } from 'react-hooks-router'

const App: React.FunctionComponent = () => {
  const route = useRouter({ routes })
  return (
    <div>
      <h1>{route.name}</h1>
    </div>
  )
}

export default App
```

## Optional OnRouted Callbacks

Optional `onRouted` and `onRoutedUnhandled` parameters will be invoked for every matching route change

```ts
const onRoutedUnhandled = ({ name, props, path }) => {
  console.log(name, 'routed with props', props)
}

const App: React.FunctionComponent = () => {
  const route = useRouter({ routes, onRoutedUnhandled })
  // ...
}
```

or a collection of callbacks, one for each route

```ts
const onRouted = {
  user: ({ name, props, path }) => {},
  faq: ({ name, props, path }) => {},
  login: ({ name, props, path }) => {},
  notFound: ({ name, props, path }) => {}
}

const App: React.FunctionComponent = () => {
  const route = useRouter({ routes, onRouted })
  // ...
}
```

## Initial Route

When your component is first rendered and before the routing effect has fired, there will be a moment when the current route has not yet been determined. By default useRouter will return `{ name: 'loading', params: {} }` until the actual route is determined. You can change this by passing in an `initialRoute`.

```ts
const App: React.FunctionComponent = () => {
  const route = useRouter({ initialRoute: { name: 'home', params: {}, path: '' }, routes })
  // ...
}
```
