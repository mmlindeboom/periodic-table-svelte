<script>
  export let className
  export let size = "5"
  export let color = "black"
</script>

<svg class="fill-current fill-current text-{color} inline h-{size} w-{size} {className}"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20">
    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
</svg>


<style>
  svg {
    color: inherit
  }
</style>