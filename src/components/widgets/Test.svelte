<script>
import {dispatch} from "adorable"

const 클릭 = () => dispatch("클릭")
</script>

<button on:click={클릭}>클릭</button>