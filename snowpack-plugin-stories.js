const urlencode = require('urlencode')
const glob = require('glob')
const fs = require('fs').promises

module.exports = function (snowpackConfig, pluginOptions) {

  let lastResult = ""

  return {
    name: 'stories',

    async run(params) {
      return this.onChange(params)
    },

    async onChange(params) {
      if (params && params.filePath && params.filePath.endsWith("src/stories/index.ts")) {
        return
      }

      console.log("onChange", params)

      return new Promise(resolve => {
        glob("src/stories/**/*.{js,ts}", {}, async (error, files) => {
          const imports = files
            .map(file => file.endsWith(".ts") ? file.slice(0, -3) : file)
            .map(file => file.split("/").map(path => urlencode(path)).join("/"))
            .map(path => path.replace("src/stories/", "./"))
            .filter(path => path !== "./index")
            .map(path => `import "${path}"`)
            .join("\n")

          if (lastResult !== imports) {
            lastResult = imports
            await fs.writeFile("src/stories/index.ts", imports)
            resolve()
          } else {
            resolve()
          }
        })
      })
    }
  }
}