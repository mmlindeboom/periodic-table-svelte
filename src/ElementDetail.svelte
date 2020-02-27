<script>
  import { fly } from 'svelte/transition'
  import Atom from './Atom.svelte'
  export let atom
  export let close
</script>

<style>
  .detail-card {
    position: absolute;
    width: 600px;
    min-height: 150px;
    left: 15%;
    top: 300px;
    border: 1px solid #ccc;
    @apply rounded shadow-lg px-6 py-4 overflow-hidden;
  }

  .atom-card {
    @apply float-right
  }

  button {
    @apply float-right bg-white border-none
  }
</style>

<div class="detail-card" in:fly="{{ y: -20 }}" out:fly="{{ y: -20 }}">
  <button on:click={close}>x</button>
  <h3>{atom.name}</h3>
  <div class="atom-card">
    <Atom atom={atom} />
  </div>
</div>