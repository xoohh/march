const fg = require('fast-glob')
const fs = require('fs').promises
const path = require('path')

const lookbookPath = "src/components"

async function run() {
  const files = await fg(lookbookPath + "/**/*.svelte")
  console.log(files)

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

  console.log(imports)
  console.log(routes)

  const file = "src/Lookbook.svelte"
  const data = await fs.readFile(file, "utf8")

  const result = data.replace("/* imports */", imports).replace("/* routes */", routes)

  console.log(result)
}


run()