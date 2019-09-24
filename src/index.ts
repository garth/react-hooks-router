import page from 'page'
import { useState, useEffect } from 'react'

const rawUrl = Symbol('rawUrl')
export type RouteToString = (params: RouteParams | typeof rawUrl) => string
export interface RouteParams {
  [name: string]: string
}
export interface Routes {
  [name: string]: string | RouteToString
}
export interface Route {
  name: keyof Routes
  params: RouteParams
  path: string
}
export type OnRouted = (route: Route) => any

export const useRouter = <T extends Routes>({
  initialRoute = { name: 'loading', params: {}, path: '' },
  routes,
  onRouted,
  onRoutedUnhandled
}: {
  initialRoute?: Route
  routes: T
  onRouted?: { [P in keyof T]?: OnRouted }
  onRoutedUnhandled?: OnRouted
}): Route => {
  const [route, setRoute] = useState<Route>(initialRoute)

  useEffect(() => {
    Object.keys(routes).forEach(name => {
      const path = routes[name]
      const callback = (onRouted && onRouted[name]) || onRoutedUnhandled
      page(typeof path === 'function' ? path(rawUrl) : path, ({ params, path }) => {
        const route = { name, params, path }
        setRoute(route)
        if (callback) {
          callback(route)
        }
      })
    })
    page.start({})

    return () => {
      page.stop()
    }
  }, [])

  return route
}

export const route = (url: string, params: RouteParams | typeof rawUrl = {}) => {
  if (params === rawUrl) {
    return url
  }
  const parts: string[] = []
  for (const part of url.split('/')) {
    const matches = /^:(.+?)(\?)?$/.exec(part)
    if (matches) {
      const paramValue = params[matches[1]]
      if (paramValue !== undefined) {
        parts.push(`${paramValue}`)
      } else if (matches[2] === '?') {
        break
      } else {
        parts.push('')
      }
    } else {
      parts.push(part)
    }
  }

  return parts.join('/')
}
