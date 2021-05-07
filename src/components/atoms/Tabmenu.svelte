<div class="hbox w(100%) h(36px) b(#000) r(36px) bg(#fff) f(14px) medium clip">

    {#each ['전체','진행중','완료'] as menu}
    <button class="flex h(100%) p(4px) pack bg(#fff) hover:bg(#000) hover:c(#fff) .selected:bg(#000) .selected:c(#fff) br(#000) last-child:b(none)">
        <div>{menu}</div>
    </button>
    {/each}

</div>