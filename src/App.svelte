<script>
import Router from 'svelte-spa-router'
import Home from "./pages/Home.svelte"

const routes = {
  '/': Home,
}
</script>

<Router {routes}/>

<style global>
body {
  font-size: 1.4rem;
  line-height: 1.15;
  word-break: break-word;
}

a {
  text-decoration: none;
}
</style>