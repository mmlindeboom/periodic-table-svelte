<script>
  import { fly, fade } from 'svelte/transition'
  import { onMount, afterUpdate } from 'svelte'
  import { elementStyle } from './styles'

  export let detail
  export let variant
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

  export let inactive

  let detailDirection

  let element


  onMount(() => {
    detailDirection = 'left'
    if (posY > 3) {
      detailDirection = 'top'
    }
    if (posY > 12) {
      detailDirection = 'right'
    }
  })
</script>

<!------------------------------------------->
<!----------------MARKUP--------------------->
<!------------------------------------------->

{#if visible}
  <div
    bind:this={element}
    on:click={() => updateAtom(element, detailDirection, variant)}
    in:fly="{{ delay: 5 * id, y: -20}}"
    class:inactive
    class:detail

    class="{variant}-screen {elementStyle(color, visible)}">


    {#if variant === 'mobile'}
      <p class="symbol">{symbol}</p>
    {/if}

    {#if variant === 'tablet'}
      <p class="id">{id}</p>
      <p class="symbol">{symbol}</p>
    {/if}

    {#if variant === 'laptop'}
      <p class="id">{id}</p>
      <p class="symbol">{symbol}</p>
      <p class="name">{name}</p>
      <p class="mass">{mass}</p>
    {/if}

    {#if detail}
      <p class="id">{id}</p>
      <p class="symbol">{symbol}</p>
      <p class="name">{name}</p>
      <p class="mass">{mass}</p>
    {/if}

  </div>
{:else}
  <div class="{elementStyle(color, visible, count)}"></div>
{/if}

<!------------------------------------------->
<!----------------STYLES--------------------->
<!------------------------------------------->
<style>
  .inactive {
    opacity: 0.2;
    pointer-events: none;
    transition: all 0.6s
  }

  .detail {
    display: inline-block;
    font-size: 1em;
  }

  div {
    text-align: left;
    font-size: 1.25em;
    color: #000;
    transition: all 0.4s;
    @apply rounded shadow-md;
  }

  div:hover {
    cursor: pointer;
    border-color: darkseagreen;
    @apply shadow-lg
  }

  p {
    overflow: hidden
  }
  .id {
    font-size: 0.75em;
  }
  .symbol {
    font-size: 1.2em;
    @apply
  }

  .name {
    font-size: 0.7em

  }
  .mass {
    font-size: 0.75em
  }

  .mobile-screen, .tablet-screen{
    font-size: 0.875em;
    text-align: center;
    margin: 4px;
    padding: 4px;
  }
</style>