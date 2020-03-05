<script>

  export let screen

  const variantClass = (size) => {
    let className = ''
    switch(size) {
      case 'mobile':
        className = 'mobile:block tablet:hidden laptop:hidden'
      break;
      case 'tablet':
        className = 'mobile:hidden tablet:block laptop:hidden'
      break;
      case '> mobile':
        className = 'mobile:hidden tablet:block laptop:block'
      break;
      default:
        className = 'mobile:hidden tablet:hidden laptop:block'
    }

    return className
  }
</script>

<div class="block {variantClass(screen)}">
  <slot></slot>
</div>