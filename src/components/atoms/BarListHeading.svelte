{#each ['', 'primary', 'secondary'] as status}
  <div
      class="pack h(18) bg(--dark-gray) c(--white) font(12) bold .primary:bg(--ui-primary) .secondary:bg(--ui-secondary) {status}">
    <div>기본 정보</div>
  </div>
{/each}