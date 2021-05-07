{#each ['', 'primary', 'secondary'] as status}
  <div
      class="hbox w(f) h(20) bg(--dark-gray) c(--white) p(0/12px) f(14) bold .primary:bg(--ui-primary) .secondary:bg(--ui-secondary) {status}">
    <div class="flex">3월 27일</div>
    <div class="text-right">수요일</div>
  </div>
{/each}