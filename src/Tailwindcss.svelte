<style global>
  @import "tailwindcss/base";
  @font-face {
    font-family: Playfair Display;
    font-weight: 400;
    src: url(/fonts/playfair/PlayfairDisplay-Regular.otf) format("opentype");
  }
  @import "tailwindcss/components";

  @import "tailwindcss/utilities";



  html, body {
    @apply font-body bg-white py-4 px-4;
  }

  div {
     box-sizing: border-box;
  }

  h1, h2, h3, h4, h5 {
    @apply font-display
  }
</style>