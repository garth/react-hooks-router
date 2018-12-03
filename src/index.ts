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
  name: string
  params: RouteParams
}
export type OnRouted = (route: Route) => any

export const useRouter = <T extends Routes>(routes: T, onRouted?: OnRouted | { [P in keyof T]?: OnRouted }): Route => {
  const [route, setRoute] = useState<Route>({ name: 'loading', params: {} })

  useEffect(() => {
    Object.keys(routes).forEach(name => {
      const path = routes[name]
      const callback = onRouted && (typeof onRouted === 'function' ? onRouted : onRouted[name])
      page(typeof path === 'function' ? path(rawUrl) : path, ({ params }) => {
        const route = { name, params }
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
