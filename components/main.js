function main() {
  /* Initialization */
  const { gl, meshProgramInfo } = initializeWorld()

  twgl.setAttributePrefix('a_')

  let programInfo = twgl.createProgramInfo(gl, [vs, fs])

  let polygons = []

  /* GUI Variables */

  let gui = new GUI()

  let onClick = {
    'New Polygon': () => {
      polygons.push(new Polygon(gl, programInfo, gui))
    }
  }

  gui.add_element(onClick, 'New Polygon', false)

  let camera = new Camera(gui)

  /* Scene loop */

  requestAnimationFrame(drawScene)

  function drawScene(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight

    camera.compute(aspect)

    gl.useProgram(programInfo.program)

    polygons.forEach(elem => {
      elem.draw(time, camera.viewProjectionMatrix)
    })

    requestAnimationFrame(drawScene)
  }
}

main()
