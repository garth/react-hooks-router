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
  const route = useRouter(routes)
  return (
    <div>
      <h1>{route.name}</h1>
    </div>
  )
}

export default App
```

# Optional OnRouted Callback

A second optional parameter can be used for either a single callback that is invoked for every route change

```ts
const onRouted = ({ name, props }) => {
  console.log(name, 'routed with props', props)
}

const App: React.StatelessComponent = () => {
  const route = useRouter(routes, onRouted)
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
  const route = useRouter(routes, onRouted)
  // ...
}
```
