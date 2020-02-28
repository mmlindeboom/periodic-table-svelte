<script>

  import Element from "./Element.svelte";
  import ElementDetail from './ElementDetail.svelte'


  export let rows
  export let atom
  export let updateAtom
</script>
<style>
</style>




{#if atom}
  <ElementDetail atom={atom} close={() => atom = null}></ElementDetail>
{/if}
<div>
  {#each rows as row}
    {#if row}
      {#each row as el (el.uuid)}
          <Element updateAtom={() => updateAtom(el)} count={row.length} {...el} />
      {/each}
    {/if}
  {/each}
</div>