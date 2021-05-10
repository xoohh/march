<script>
  import SignInForm from "../organisms/SignInForm.svelte";
  import ButtonInline from "../atoms/ButtonInline.svelte";
</script>

<div class="w(375) min-h(500) vbox pack p(0/16) bg(--white)">
    <div class="text-center"><img src="imgs/logo-planit.svg" width="120"/></div>

    <div class="space(24)"></div>

    <SignInForm></SignInForm>

    <div class="space(8)"></div>

    <ButtonInline>Forgot your password?</ButtonInline>
</div>