<script>
  import Element from "./Element.svelte";
  import ElementDetail from "./ElementDetail.svelte";

  export let rows;
  export let atom;
  export let updateAtom;

  let selectedEl
  let detailDirection = 'left'

  const toggleDetail = (el, dom, direction) => {
    if (dom) {
      atom = el
      selectedEl = dom.getBoundingClientRect()
      detailDirection = direction
    }
  }
</script>

<style>
  div {
    width: 100%
  }
</style>

{#if atom}
  <ElementDetail
    selectedEl={selectedEl}
    direction={detailDirection}
    atom={atom}
    close={() => (atom = null)} />
{/if}
<div>
  {#each rows as row}
    {#if row}
      {#each row as el (el.uuid)}
        <Element updateAtom={(domEl, direction) => toggleDetail(el, domEl, direction)}
                count={row.length}
                {...el} />
      {/each}
    {/if}
  {/each}
</div>
