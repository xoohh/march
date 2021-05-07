const fg = require('fast-glob')
const fs = require('fs').promises

// generate
require("css.escape")

const __var = (value) => String(value).startsWith("--") ? `var(${value})` : value

const px = (value) => {
  if (String(value).startsWith("--")) return __var(value)
  if (value === 0 || value === "0") return 0
  if (value === 'f' || value === 'full') return '100%'
  return +value === +value ? value + "px" : value
}

const percentToEm = (value) => {
  if (!value.endsWith("%")) return value
  return Math.round(+value.slice(0, -1) / 100) + "em"
}

const makeFont = (value) => value.split("/").map((value, index) => {
  if (String(value).startsWith("--")) return `var(${value})`
  switch (index) {
    case 0: {return `font-size: ${px(value)}`}
    case 1: {return parseFloat(value) < 0 ? `letter-spacing: ${px(percentToEm(value))}` : `line-height: ${px(value)}`}
    case 2: {return `letter-spacing: ${px(percentToEm(value))}`}
  }
}).join(";")

// @TODO:
const makeBorder = (value) => {
  if (value === "none") return "none"
  return `1px solid ${makeColor(value)}`
}

const makeColor = (value = "transparent") => {
  if (value === "transparent") return "transparent"
  if (String(value).startsWith("--")) return `var(${value})`
  const [rgb, a] = value.split(".")
  if (a && rgb.length === 4) return "rgba(" + [...rgb.slice(1)].map(value => parseInt(value + value, 16)).join(",") + ",." + a + ")"
  if (a) return "rgba(" + [rgb.slice(1, 3), rgb.slice(3, 5), rgb.slice(5, 7)].map(value => parseInt(value, 16)).join(",") + ",." + a + ")"
  return value
}

const makeSide = (value) => {
  if (String(value).startsWith("--")) return `var(${value})`
  return value && value.split("/").map(px).join(" ")
}

const RULES = {
  x: value => `left: ${px(value)}`,
  y: value => `top: ${px(value)}`,
  z: value => `z-index: ${__var(value)}`,
  w: value => `width: ${px(value)}`,
  "min-w": value => `min-width: ${px(value)}`,
  "max-w": value => `max-width: ${px(value)}`,
  h: value => `height: ${px(value)}`,
  "min-h": value => `min-height: ${px(value)}`,
  "max-h": value => `max-height: ${px(value)}`,
  r: value => `border-radius: ${makeSide(value)}`,
  m: value => `margin: ${makeSide(value)}`,
  mt: value => `margin-top: ${px(value)}`,
  mr: value => `margin-right: ${px(value)}`,
  mb: value => `margin-bottom: ${px(value)}`,
  ml: value => `margin-left: ${px(value)}`,
  p: value => `padding: ${makeSide(value)}`,
  pt: value => `padding-top: ${px(value)}`,
  pr: value => `padding-right: ${px(value)}`,
  pb: value => `padding-bottom: ${px(value)}`,
  pl: value => `padding-left: ${px(value)}`,
  b: value => `border: ${makeBorder(value)}`,
  bt: value => `border-top: ${makeBorder(value)}`,
  br: value => `border-right: ${makeBorder(value)}`,
  bb: value => `border-bottom: ${makeBorder(value)}`,
  bl: value => `border-left: ${makeBorder(value)}`,
  btw: value => `border-top-width: ${px(value)}`,
  brw: value => `border-right-width: ${px(value)}`,
  bbw: value => `border-bottom-width: ${px(value)}`,
  blw: value => `border-left-width: ${px(value)}`,
  bg: value => `background: ${makeColor(value)}`,
  opacity: value => `opacity: ${__var(value)}`,
  c: value => `color: ${makeColor(value)}`,

  font: value => makeFont(value),
  medium: value => `font-weight: 500`,
  semibold: value => `font-weight: 600`,
  bold: value => `font-weight: bold`,
  italic: value => `font-style: italic`,
  underline: value => `text-decoration: underline`,
  monospace: value => `font-family: menlo, monospace`,
  nowrap: value => `white-space: nowrap`,
  "nowrap...": value => `white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,

  none: () => `display:none`,
  block: () => `display:block; width:100%`,
  inline: () => `display:inline`,
  gone: () => `position: absolute; width: 0; height: 0; overflow: hidden`,
  contain: () => `background-size: contain; object-fit: contain; background-position: center`,
  cover: () => `background-size: cover; object-fit: cover; background-position: center`,

  hbox: () => `display:flex; align-items:center`,
  vbox: () => `display:flex; flex-flow: column; align-items:stretch`,
  pack: () => `display:flex; flex-flow: inherit; align-items:center; justify-content:center`,
  flex: () => `flex:1`,
  space: value => `padding: ${px(value / 2)}`,
  gap: value => `gap: ${px(value)}`,
  cursor: value => `cursor:${value}`,
  right: value => `right: ${px(value)}`,
  bottom: value => `bottom: ${px(value)}`,
  "max-width": value => `max-width: ${px(value)}`,
  "no-border": () => `border:none;outline:none`,
  "app-region": (value) => `-webkit-app-region:${value}`,
  overflow: (value) => `overflow:${value}`,
  clip: () => `overflow: hidden`,
  transition: value => `transition: all ${value}`,
  rotate: value => `transform: rotate(${value})`,
  invisible: value => `visibility: hidden`,
  visible: value => `visibility: visible`,

  "scroll-x": () => `overflow-x: scroll`,
  "scroll-y": () => `overflow-y: scroll`,

  "break-all": () => `word-break: break-all`,
  "break-word": () => `word-break: break-word`,
  "keep-all": () => `word-break: keep-all`,

  "line-clamp": (value) => `display: -webkit-box; -webkit-line-clamp: ${value}; -webkit-box-orient: vertical; overflow: hidden`,

  "uppercase": () => `text-transform: uppercase`,
}

const PREFIX_RULES = {
  ".class:": (value, cls) => `${cls}&,${cls} & { ${value} }`,
  "placeholder:": value => `&::placeholder { ${value} }`,
  "hover:": value => `&:hover { ${value} }`,
  "active:": value => `&:active { ${value} }`,
  "disabled:": value => `&:disabled { ${value} }`,
  "focus:": value => `&:focus { ${value} }`,
  "focus-within:": value => `&:focus-within { ${value} }`,
  "group-hover:": value => `.group:hover & { ${value} }`,
  "group-focus:": value => `.group:focus & { ${value} }`,
  "mobile:": value => `@media only screen and (max-width: 767px) { html & { ${value} }}`,
  "first-child:": value => `&:first-child { ${value} }`,
  "last-child:": value => `&:last-child { ${value} }`
}

const rules = (r) => RULES[r] || (() => "")
const prefix_rules = (r) => PREFIX_RULES[r] || ((r) => r)

const regEx = /^([^:]+:)?([^(]+)(?:\(([^)\s]+)\))?[!]?$/g

const generateCss = (source) => {

  const styleTexts = []

  source.split(/\n/).forEach(string => string.replace(/(?:"[^"]+")/gm, (a) => {
    const className = a.slice(1, -1)
    const classList = className.split(/\s/)

    classList.forEach(cls => {
      if (!regEx.test(cls)) return

      const important = cls.slice(-1) === "!" ? "!important;" : ";"

      const result = cls.replace(regEx, (a, prefix, b, c) => {

        if (b.slice(-1) === "!") b = b.slice(0, -1)

        // @FIXME:.. ex) .task--is-active:c(#fff)
        let option
        if (prefix && prefix.startsWith(".") && prefix.endsWith(":")) {
          option = prefix.slice(0, -1)
          prefix = ".class:"
        }

        const rule = rules(b)(c)
        if (!rule) return ""

        const ruleWithImportant = (rule + ";").replace(/;/g, important)
        return prefix_rules(prefix)(ruleWithImportant, option)
      })
      if (!result) return

      const escapedClass = `.${CSS.escape(cls)}`
      const styleText = result.includes("&") ? result.replace(/&/g, escapedClass) : `${escapedClass}{${result}}`
      styleTexts.push(styleText)
    })
  }))

  return styleTexts
}


// @TODO: run할때 한번에 찾고, onchange시 증분하는 식으로 하자.
module.exports = function (snowpackConfig, pluginOptions) {

  let lastCSS = ""

  return {
    name: 'atomizer',

    async run(params) {
      return this.onChange(params)
    },

    async onChange(params) {
      if (params && params.filePath && params.filePath.endsWith("docs/atoms.css")) {
        return
      }

      // console.log("onChange", params)
      // console.log(snowpackConfig, pluginOptions)

      return new Promise(async resolve => {
        const files = await fg("src/**/*.{svelte,js,ts}")
        const result = []

        for (const file of files) {
          const data = await fs.readFile(file, "utf8")
          result.push(...generateCss(data))
        }

        const css = [...new Set(result)].filter(Boolean).sort().join("\n")

        if (lastCSS !== css) {
          lastCSS = css
          await fs.writeFile("docs/atoms.css", css)
          resolve()
        } else {
          resolve()
        }
      })
    }
  }
}