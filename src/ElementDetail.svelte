<!------------------------------------------->
<!----------------JS------------------------->
<!------------------------------------------->

<script>
  import { onMount, afterUpdate } from 'svelte'
  import { fly, slide } from 'svelte/transition'
  import Atom from './Atom.svelte'
  import Element from './Element.svelte'
  import { CloseBtn } from './ui'
  export let atom
  export let close
  export let selectedEl
  export let x
  export let y
  export let direction
  export let fullDetail = false

  let detailElement
  let detailRect = {height: 0}
  let scrollY

  $: flyOptions = getFlyOptions(direction)

  const handleFullDetail = () => {
    fullDetail = true
  }


  const getFlyOptions= (dir) => {
    let opts
    switch(dir) {
      case 'top':
        opts = { y: -5, speed: 50}
      break;
      case 'left':
        opts = {x: -5, speed: 50}
      break;
      case 'right':
        opts = {x: 10, speed: 50}
      break;
      default:
        opts = { y: -5, speed: 50}
    }

    return opts
  }
  onMount(() => {
    detailRect = detailElement.getBoundingClientRect()
  })

  afterUpdate(() => {
    scrollY = window.scrollY
    scrollX = window.scrollX
    if (direction === 'left') {
      x = selectedEl.x + selectedEl.width + 15
      y = (selectedEl.y - ((detailRect.height / 2) - (selectedEl.height/2))) + scrollY
    }

    if (direction === 'top') {
      x = selectedEl.x - ((detailRect.width/2) - (selectedEl.width/2)) + scrollX
      y = ((selectedEl.y - detailRect.height) - 15)+ scrollY
    }

    if (direction === 'right') {
      x = selectedEl.x - (detailRect.width + 15)
      y = (selectedEl.y - ((detailRect.height / 2) - (selectedEl.height/2))) + scrollY
    }


  })
</script>

<!------------------------------------------->
<!----------------MARKUP--------------------->
<!------------------------------------------->
{#if atom}
  <div class="detail-card full"
      transition:fly
      bind:this={detailElement}

  >

    <CloseBtn handleClick={() => close()} />
    <Element detail={fullDetail} {...atom}/>
    <div class="detail-body py-4">
      <ul>
        <li><strong>Atomic Number:</strong> {atom.id}</li>
        <li><strong>Mass:</strong> {atom.mass}</li>

      </ul>
    </div>
    <div class="atom-card container mx-auto">
      <Atom size="300" atom={atom} />
    </div>


  </div>

{:else}
  <div class="detail-card"
      bind:this={detailElement}
      in:fly="{flyOptions}"
      out:fly="{flyOptions}"
      style="left: {x}px; top: {y}px"
  >
    <svg class="pointer-{direction}" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      {#if direction === "left"}
        <g transform="translate(4, 10) rotate(-45)">
          <rect width="15" height="15" fill="white" stroke="#ccc" stroke-dasharray="15 15 0" />
        </g>
      {/if}
      {#if direction === "top"}
        <g transform="translate(4, 10) rotate(-135 7 7)">
          <rect width="15" height="15" fill="white" stroke="#ccc" stroke-dasharray="15 15 0" />
        </g>
      {/if}
      {#if direction === "right"}
        <g transform="translate(4, 10) rotate(135 7 7)">
          <rect width="15" height="15" fill="white" stroke="#ccc" stroke-dasharray="15 15 0" />
        </g>
      {/if}
    </svg>

    <CloseBtn handleClick={() => close()} />
    <h3>{atom.name}</h3>
    <div class="atom-card container mx-auto">
      <Atom atom={atom} />
    </div>
    <div class="detail-body py-4">
      <ul>
        <li>Mass: {atom.mass}</li>
      </ul>
    </div>

    <div class="detail-footer"><button on:click={handleFullDetail}>More</button></div>
  </div>
{/if}


<!------------------------------------------->
<!----------------STYLE---------------------->
<!------------------------------------------->

<style type="text/postcss">

  .detail-card {
    position: absolute;
    width: 500px;
    min-height: 300px;
    left: 15%;
    top: 8em;
    border: 1px solid #ccc;
    z-index: 1000;
    text-align: left;
    @apply rounded bg-white shadow-lg px-6 py-4;
  }

  .detail-card.full {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border: 0;
    transition: all 0.6s;
  }
  svg.pointer-left {
    position: absolute;
    left: -15px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
   svg.pointer-top {
    position: absolute;
    bottom: -15px;
    left: 0;
    right: 0;
    margin: auto;
  }
  svg.pointer-right {
    position: absolute;
    right: -20px;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .atom-card {
    width: 150px
  }
</style>

