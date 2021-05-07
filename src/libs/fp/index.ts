const __is = (a:any) => (b:any) => Object.is(a, b)

/// localStorage
export const __localStorage = {
  getItem: <T>(key:string, defaults = undefined):T|undefined => {
    try {
      const item = localStorage.getItem(key)
      return item === null ? defaults : JSON.parse(item)
    }
    catch (e) {
      return defaults
    }
  },
  setItem: <T>(key:string) => (value:T) => localStorage.setItem(key, JSON.stringify(value))
}

export const __sessionStorage = {
  getItem: <T>(key:string, defaults = undefined):T|undefined => {
    try {
      const item = sessionStorage.getItem(key)
      return item === null ? defaults : JSON.parse(item)
    }
    catch (e) {
      return defaults
    }
  },
  setItem: <T>(key:string) => (value:T) => sessionStorage.setItem(key, JSON.stringify(value))
}

/// common.js
export const __itself = (value:any) => () => value


/// Util
export const __typeof = (value:any) => {
  const s = typeof value

  if ("object" === s) {
    if (value) {
      if (value instanceof Array) {
        return "array"
      }
      if (value instanceof Object) {
        return s
      }

      const className = Object.prototype.toString.call(value)

      if ("[object Window]" === className) {
        return "object"
      }

      if ("[object Array]" === className || "number" == typeof value.length && "undefined" != typeof value.splice && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("splice")) {
        return "array"
      }

      if ("[object Function]" === className || "undefined" != typeof value.call && "undefined" != typeof value.propertyIsEnumerable && !value.propertyIsEnumerable("call")) {
        return "function"
      }
    }
    else {
      return "null"
    }
  }
  else {
    if ("function" === s && "undefined" == typeof value.call) {
      return "object"
    }
  }

  return s
}


/// object.js
export const __cloneObject = (obj, circular = [], cloned = []) => {

  const type = __typeof(obj)
  if ("object" === type || "array" === type) {
    if ("function" === typeof obj.clone) {
      return obj.clone()
    }

    const index = circular.indexOf(obj)
    if (index >= 0) {
      return cloned[index]
    }

    let clone = "array" === type ? [] : {}, key
    for (key in obj) {
      clone[key] = __cloneObject(obj[key], circular)
    }

    circular.push(obj)
    cloned.push(clone)
    return clone
  }

  return obj
}


/// array.js
export const __array_difference = (a, b, callback = __itself) => a.filter(x => !b.map(callback).includes(callback(x))).concat(b.filter(x => !a.map(callback).includes(callback(x))))

export const __memoize1 = (func) => {
  const cache = Object.create(null)
  return (key, ...args) => {
    return (cache[key] = key in cache ? cache[key] : func(key, ...args))
  }
}

export const __array_unique = <T>(array:T[], callback:((item:T) => any) = (item:T) => item):T[] => {
  const check = Object.create(null)
  const result:T[] = []

  array.forEach(item => {
    const key = callback(item)
    if (!check[key]) {
      check[key] = true
      result.push(item)
    }
  })

  return result
}


export const __array_group_by = <T>(array:T[], makeKeyCallback:((item:T) => string)):Record<string, T[]> => {
  const groupBy = Object.create(null)
  array.forEach(row => {
    const key = makeKeyCallback(row)
    groupBy[key] = groupBy[key] || []
    groupBy[key].push(row)
  })

  return groupBy
}