const fg = require('fast-glob')
const fs = require('fs').promises
const path = require('path')

module.exports = function (snowpackConfig, pluginOptions) {

  const lookbookPath = "src/components"
  const distPath = "src/lookbook.routes.ts"

  return {
    name: 'components',

    async run(params) {
      return this.onChange(params)
    },

    async onChange(params) {
      if (params && params.filePath && params.filePath.endsWith(distPath)) {
        return
      }

      const files = await fg(lookbookPath + "/**/*.svelte")
      // console.log(files)

      const imports = files.map(file => {
        const basename = path.basename(file, ".svelte")
        const retPath = file.replace(/^[^/]*\//, "./")
        return `import ${basename} from "${retPath}"`
      }).join("\n")

      const routes = files.map(file => {
        const dirname = path.dirname(file).slice(lookbookPath.length)
        const basename = path.basename(file, ".svelte")
        return `"${dirname}/${basename}": ${basename}`
      }).join(",")

      const code = `${imports}\nexport const routes = {${routes}}`
      await fs.writeFile(distPath, code)
    }
  }
}