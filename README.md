# react-hooks-router

A react hooks approach to routing.

This library is a simple wrapper around page.js.

> Disclaimer: To use hooks a pre-release version of react 16.7 is required. Since the hooks API is subject to change, this library may or may not work with future versions of react.

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

const App: React.StatelessComponent = () => {
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
const onRoutedUnhandled = ({ name, props }) => {
  console.log(name, 'routed with props', props)
}

const App: React.StatelessComponent = () => {
  const route = useRouter({ routes, onRoutedUnhandled })
  // ...
}
```

or a collection of callbacks, one for each route

```ts
const onRouted = {
  user: ({ name, props }) => {},
  faq: ({ name, props }) => {},
  login: ({ name, props }) => {},
  notFound: ({ name, props }) => {}
}

const App: React.StatelessComponent = () => {
  const route = useRouter({ routes, onRouted })
  // ...
}
```

## Initial Route

When your component is first rendered and before the routing effect has fired, there will be a moment when the current route has not yet been determined. By default useRouter will return `{ name: 'loading', params: {} }` until the actual route is determined. You can change this by passing in an `initialRoute`.

```ts
const App: React.StatelessComponent = () => {
  const route = useRouter({ initialRoute: { name: 'home', params: {} }, routes })
  // ...
}
```
