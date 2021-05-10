<script>
import Router from 'svelte-spa-router'
import {routes} from "./lookbook.routes"

const files = Object.keys(routes).sort()
const types = ["atoms", "molecules", "organisms", "templates", "widget", "view"]

let currentType = "view"

const select = (type) => currentType = type

$: currentFiles = files.filter(file => file.startsWith("/" + currentType))
</script>


<div class="layer hbox--full">
  <div class="w(80) bg(#fff) clip scroll-y br(#ccc)">
    {#each types as type}
      <button class="font(11) p(8) block nowrap .selected:bg(#000) .selected:c(#fff)" class:selected={currentType===type} on:click={() => select(type)}>{type}</button>
    {/each}
  </div>
  <div class="bg(#fff) clip scroll-y br(#ccc)">
    {#each currentFiles as file}
      <a class="font(11) p(8) block nowrap" href="#{file}">{file.split('/').join(' / ')}</a>
    {/each}
  </div>

  <div class="flex scroll-y">
    <div class="w(375px) m(auto)">
      <Router {routes}/>
    </div>
  </div>
</div>

<style global>
html, body {
  user-select: none;
  -webkit-user-select: none;
  background: #f8f9fb;
}

a {
  text-decoration: none;
}

body {
  font-size: 1.4rem;
  line-height: 1.15;
  word-break: break-word;
}
</style>