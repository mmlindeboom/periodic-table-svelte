<script>
  import { CloseIcon } from '../icons/'
  export let handleClick
  export let className
</script>

<button on:click={handleClick} class="close {className}"><CloseIcon size="4" /></button>

<style>
  button.close {
    position: absolute;
    top: 5px;
    right: 15px;
    color: gray;
    @apply border-none
  }

  button.close:hover {
    color: black
  }
</style>