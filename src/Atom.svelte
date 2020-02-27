<script>
  import { canvasStyle } from './styles'
  import { onMount, afterUpdate } from 'svelte'

  export let atom;

  let electrons = atom.id
  let i = 0
  let z = 0
  let canvas
  let ctx
  let electronsAnim
  let drawAnim

  function draw() {
    const h = canvas.height
    const w = canvas.width

    var circle = function(color, r) {
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
      ctx.closePath();

      ctx.fill();
    }
    ctx.save()
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, w, h);

    // set origin to center
    ctx.translate(w / 2, h / 2);

    // draw sun
    circle('#999999', 5);
    ctx.restore();
    drawAnim = window.requestAnimationFrame(draw)
  }

  let rotation = 0
  let speed = 0
  function drawElectron(e) {

    const idx = e && e < electrons ? e : electrons
    return function() {
      ctx.save()
      const h = canvas.height
      const w = canvas.width
      const v = idx * 20
      var valence = (r) => {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.strokeStyle="#ccc"
        ctx.stroke()
      }

      var circle = function(color, r) {
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.closePath();

        ctx.fill();
      }


      // set origin to center
      ctx.translate(w / 2, h / 2);

      valence(v)

      // rotate + move along x

      ctx.rotate(rotation/(v));
      ctx.translate(v, 0);

      // draw planet
      circle('red', 2);


      rotation += 0.04
      electronsAnim = window.requestAnimationFrame(drawElectron(idx));

      ctx.restore();


    }
  }

  const redraw = () => {

    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    rotation = 0
    electrons = 0
    electrons = atom.id


    ctx.restore()
    if (electronsAnim) cancelAnimationFrame(electronsAnim)
    if (drawAnim) cancelAnimationFrame(drawAnim)
    draw()

    for (let e = 0; e <= electrons; e++) {
      electronsAnim = window.requestAnimationFrame(drawElectron(e))
    }
  }


  onMount(()=> {
    canvas = document.getElementById("atomCanvas")
    ctx = canvas.getContext("2d")
    redraw()
  })

  afterUpdate(() => {
    ctx.save()
    redraw()
  })


</script>

<style>
  div {
    border: 1px solid #ccc;
    @apply rounded;
  }
</style>
<div class={canvasStyle}>
  <canvas id="atomCanvas"  height="150" width="300" />
</div>

