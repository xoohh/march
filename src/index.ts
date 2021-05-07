// const type = <T>(c:T) => new c()
//
// class Callable extends Function {
//   constructor(fn) {
//     function closure(...args) {return fn(...args)}
//     return Object.setPrototypeOf(closure, new.target.prototype)
//   }
// }
//
// class Selector extends Callable {
//   constructor() {
//     super((a) => console.log(a))
//   }
//
//   set() {
//
//   }
//
//   update() {
//
//   }
//
//   subscribe() {
//
//   }
// }
//
// class ID extends Selector {}
//
// class Foo extends Selector {
//   id = type(ID)
//   name = type(String)
// }
//
// class CalendarList extends Selector {
//   id = type(ID)
// }
//
// const calendarLists = new CalendarList()
//
// calendarLists(100)
//
//
// window.database = {calendarLists}


import App from "./App.svelte"

const app = new App({
  target: document.body,
})

export default app

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    app.$destroy()
  })
}