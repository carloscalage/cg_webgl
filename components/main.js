function main() {
  /* Initialization */
  const { gl, meshProgramInfo } = initializeWorld()

  twgl.setAttributePrefix('a_')

  let programInfo = twgl.createProgramInfo(gl, [vs, fs])

  let polygons = []

  let remove_polygon = name => {
    polygons = polygons.filter(elem => elem.name !== name)
  }

  /* GUI Variables */

  let gui = new GUI()

  let onClick = {
    'New Polygon': () => {
      let id = Math.random() * 10
      polygons.push({
        name: id,
        elem: new Polygon(gl, programInfo, gui, id, remove_polygon)
      })
    }
  }

  gui.add_element(onClick, 'New Polygon', false)

  let camera = new Camera(gui)

  requestAnimationFrame(drawScene)

  function drawScene(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas)

    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight

    camera.compute(aspect, time)

    gl.useProgram(programInfo.program)

    polygons.forEach(item => {
      item.elem.draw(time, camera.viewProjectionMatrix)
    })

    requestAnimationFrame(drawScene)
  }
}

main()
