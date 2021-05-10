<script>
  import InputBox from "../atoms/InputBox.svelte";
  import ButtonFill from "../atoms/ButtonFill.svelte";
</script>

<div>
  <InputBox>
    <input class="flex text-center" type="text" placeholder="email"/>
  </InputBox>

  <div class="space(8)"></div>

  <InputBox>
    <input class="flex text-center" type="password" placeholder="password"/>
  </InputBox>

  <div class="space(8)"></div>

  <ButtonFill>SIGN IN</ButtonFill>
</div>