<script>
  import * as PIXI from 'pixi.js'
  import { canvasStyle } from './styles'
  import { onMount, afterUpdate } from 'svelte'

  export let atom;
  export let size = 150
  let wrapper
  let centerY

  const app = new PIXI.Application({
      height: size,
      width: size,
      transparent:true,
      resolution: window.devicePixelRatio || 1
    })

  const container = () => new PIXI.Container()
  const electron = (type) => PIXI.Sprite.from(`assets/sprites/${type}-electron.png`)
  //
  const [sSub, pSub, dSub, fSub ] = (
    [{s:2}, {p:6}, {d:10}, {f:14}].map((obj, i, arr) => () => ({
        t: Object.keys(obj)[0],
        m: Object.values(obj)[0],
        e: []
      }
      ))
  )
  const buildConfig = (electrons) => {
    const config = ['k', 'l', 'm', 'n'].reduce((obj, lvl, idx) => {
      const n = idx + 1
      const subshells = [[sSub()], [sSub(), pSub()], [sSub(), pSub(), dSub()], [sSub(), pSub(), dSub(), fSub()]]
      const max = 2 * (Math.pow(n, 2))
      obj[lvl] = {
        max: max,
        electrons: subshells[idx]
      }
      return obj
    }, {})

    const eCount = (shell) => shell.electrons.reduce((c, s) => {
      return c + s.e.length
      }, 0)

    const notFull = (shell) => eCount(shell) !== shell.max
    const fillSubShell = (shell, subshell, config) => {
      const addElectron = (sub) => {
        if (atomIsFillable()) sub.e.push(electron(sub.t))
      }
      const updated = shell.electrons.map((sub) => {
          // const prev = arr[i-1]
          // const prevFilled = prev ? prev.e.length === prev.m : true
          // const currOpen = sub.e.length < sub.m
          // const shellFilled = eCount(shell) === shell.max

          // if (!currOpen) {
          //   console.log(`${sub.t} filled of ${name} shell`)
          // }
          // if (!shellFilled && prevFilled && currOpen) {
          //   sub.e.push(electron(sub.t))
          //   console.log(`filling ${sub.t} subshell of ${name} shell`, sub)
          // }
          // console.log(`Shell count: ${eCount(shell)}, Shell max: ${shell.max}`)
          if (sub.t === subshell) {
            for (let c = 0; c < sub.m; c++) {
              addElectron(sub)
            }
          }
          return sub
        })
      // if (max === eCount(updated)) return shell

      return updated
    }


    const { k, l, m, n } = config
    const atomElectronCount = () => Object.values(config).reduce((c, shell) => c + eCount(shell), 0)
    const atomIsFillable = () => atomElectronCount() < atom.id
    const fillOrder = ['ks', 'ls', 'lp', 'ms', 'mp', 'ns', 'md', 'np', 'nd', 'nf']



    fillOrder.forEach((orbit, index) => {
      const [lvl, shell] = orbit.split('')
      if(atomIsFillable()) {
        config[lvl].electrons = fillSubShell(config[lvl], shell)
      }

    })

    // for (let count = 0; count < electrons; count++) {
    //   const atomFillable = atomElectronCount() < electrons
    //   // 1n
    //   console.log(count+1)
    //   console.log(`Atom Electron Count: ${atomElectronCount()}, Atom Num: ${electrons}`)
    //   if (atomFillable && notFull(k)) {
    //     k.electrons = fillSubShells(k, 'k')
    //   }
    //   // 2n
    //   else if (atomFillable && notFull(l)) {
    //     l.electrons = fillSubShells(l, 'l')
    //   }
    //   // 3n
    //   else if (atomFillable && notFull(m)) {
    //     m.electrons = fillSubShells(m, 'm')
    //   }
    //   else if (atomFillable && notFull(n)) {
    //     n.electrons = fillSubShells(n, 'n')
    //   }

    // }

    return Object.keys(config).reduce((active, key) => {
      const shell = config[key]
      if (eCount(shell)) {
        active.push(shell)
      }
      return active
    }, [])
  }

  const draw = () => {
    // Create view
    wrapper.appendChild(app.view)

    // Create Nucleus
    const nucleus = PIXI.Sprite.from('assets/sprites/nucleus.png')
    const symbol = new PIXI.Text(atom.symbol, new PIXI.TextStyle({
      fontFamily: 'Playfair Display serif',
      fontSize: 18,
      fill: "#ffffff",
      strokeThickness: 0
    }))
    nucleus.anchor.set(0.5)
    symbol.anchor.set(0.5)
    nucleus.x = app.screen.width / 2
    nucleus.y = app.screen.width / 2
    nucleus.width = app.screen.width / 6
    nucleus.height = app.screen.width / 6
    symbol.position.set(app.screen.width/2)

    app.stage.addChild(nucleus)
    app.stage.addChild(symbol)

    // Number of electrons equals atomic number (number of protons)
    const electrons = atom.id

    const configuration = buildConfig(electrons)
    console.log('config built: ', configuration)
    configuration.forEach((config, idx) => {

      //const { container, shell, electrons } = config
      const container = new PIXI.Container()
      const shell = PIXI.Sprite.from('assets/sprites/shell.svg')
      const electrons = config.electrons
      let centerY

      shell.width = nucleus.width * (2 + idx)
      shell.height = nucleus.width * (2 + idx)
      shell.alpha = 0.8 - (idx * 0.2)

      app.stage.addChild(container)
      app.stage.addChild(shell)


      electrons.forEach((sub, i) => {
        let electronR
        let num = i - 1
        let len = electrons.length
        const size = 8
        const type = sub.t

        sub.e.forEach((electron, ei) => {

          electron.width = size
          electron.height = size
          electronR = electron.width / 2
          let en = ei + 1
          const r = (shell.width - electronR) / 2
          const staticR = ((nucleus.width * 2) - electronR)/2
          let radian = (15*Math.PI)/180
          let radianDiff = ((ei * radian) - radian/2)
          let cosr = r
          let sinr = r
          let angle = -Math.PI/2
          if (sub.e.length > 1) angle = (-Math.PI/2 + ((ei * radian) - radian/2))
          if (sub.t === 's') cosr = staticR
          if (sub.t === 'p') {
            cosr = staticR
            angle = Math.PI/2 + radianDiff
            if (en > 2) {
              cosr = r
              sinr = staticR
              angle = Math.PI - radian / 2
              if (en === 4) {
                angle = Math.PI + radian/ 2
              }
              if (en > 4) {
                angle = (Math.PI*2) - radian/2
              }
              if (en === 6) angle = (Math.PI*2) + radian/2
            }
          }
          if (sub.t === 'd') {
            cosr = r
            sinr = r
            let divide = ei/(sub.e.length/2)
            angle = en * (-Math.PI/2) + radian
            let copy = angle
            if (en > 1) {

              if (en === 2) {
                // angle = copy - 20
              }
              if (en > 4) {
                angle = copy + radian
              }

            }
          }
          const y0 = 0
          const x0 = 0

          const cos = cosr * Math.cos(angle)
          const sin = sinr * Math.sin(angle)
          electron.x = x0 + cos - electronR
          electron.y = y0 + sin - electronR

          container.addChild(electron)
        })

      })
      shell.anchor.set(0.5)
      shell.position.set(app.screen.width/2)
      container.x = app.screen.width / 2
      container.y = app.screen.height /2

      app.ticker.add((delta) => {
      //  const vel = 0.03125 - (idx * 0.00001)
      //   container.rotation += vel * delta;
      });
    })
  }

  let electrons = atom.id


  onMount(()=> {
    draw()
  })

</script>

<div bind:this={wrapper}>
</div>

