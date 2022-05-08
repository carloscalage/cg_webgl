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

  /* Camera Variables */

  let camera_config = {
    position_x: 0,
    position_y: 0,
    position_z: 100,
    lookat_x: 0,
    lookat_y: 0,
    lookat_z: 0,
    zoom: degToRad(60)
  }

  gui.new_category('Camera')

  gui.add_element_to_category('Camera', camera_config, 'position_x', [-200, 200, 0.1])
  gui.add_element_to_category('Camera', camera_config, 'position_y', [-200, 200, 0.1])
  gui.add_element_to_category('Camera', camera_config, 'position_z', [-200, 200, 0.1])

  gui.add_element_to_category('Camera', camera_config, 'lookat_x', [0, 200, 0.1])
  gui.add_element_to_category('Camera', camera_config, 'lookat_y', [0, 200, 0.1])
  gui.add_element_to_category('Camera', camera_config, 'lookat_z', [0, 200, 0.1])

  gui.add_element_to_category('Camera', camera_config, 'zoom', [0, degToRad(180), 0.01])

  /* Scene loop */

  requestAnimationFrame(drawScene)

  function drawScene(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    let projectionMatrix = m4.perspective(camera_config.zoom, aspect, 1, 2000)

    // Compute the camera's matrix using look at.
    let cameraPosition = [
      camera_config.position_x,
      camera_config.position_y,
      camera_config.position_z
    ]
    let target = [camera_config.lookat_x, camera_config.lookat_y, camera_config.lookat_z]

    let up = [0, 1, 0]

    let cameraMatrix = m4.lookAt(cameraPosition, target, up)

    // Make a view matrix from the camera matrix.
    let viewMatrix = m4.inverse(cameraMatrix)

    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    gl.useProgram(programInfo.program)

    polygons.forEach(elem => {
      elem.draw(time, viewProjectionMatrix)
    })

    requestAnimationFrame(drawScene)
  }
}

main()
