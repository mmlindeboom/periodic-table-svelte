<script>
  import { fly, fade } from 'svelte/transition'
  import { elementStyle } from './styles'
  /**
   * Number in periodic table
   */
  export let id
  /**
   * Symbol of Element
   */
  export let symbol
  /**
   * Element name
   */
  export let name
  /**
   * Element mass
   */
  export let mass
  /**
   * Covalent Radius of element
   */
  export let RCow
  /**
   * van der Waals radius of the element
   */
  export let RVdW
  /**
   * Element max Bonds
   */
  export let maxBonds
  /**
   * Element representation color e.g. "#3050F8"
   */
  export let color
  /**
   * Element darc color representation
   */
  export let color2
  /**
   * Position X in periodic Table
   */
  export let posX
  /**
   * Position Y in periodic Table
   */
  export let posY
  export let visible
  export let count
  export let updateAtom
</script>
{#if visible}
  <div
    on:click={updateAtom}
    in:fly="{{ delay: 5 * id, y: -20}}"
    class="{elementStyle(color, visible)}">
    <p class="id">{id}</p>
    <p class="symbol">{symbol}</p>
    <p class="name">{name}</p>
    <p class="mass">{mass}</p>
  </div>
{:else}
  <div class="{elementStyle(color, visible, count)}"></div>
{/if}


<style>
  div {
    @apply rounded shadow-md
  }
  p {
    margin: 8px 0;
    overflow: hidden
  }
  .id {
    font-size: 0.75em;
  }
  .symbol {
    font-size: 1.2em;
  }
  .name {
    font-size: 0.7em

  }
  .mass {
    font-size: 0.75em
  }
</style>