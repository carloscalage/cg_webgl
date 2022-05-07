function main() {
  const { gl, meshProgramInfo } = initializeWorld()

  // Tell the twgl to match position with a_position, n
  // normal with a_normal etc..
  twgl.setAttributePrefix('a_')

  // setup GLSL program
  var programInfo = twgl.createProgramInfo(gl, [vs, fs])

  var fieldOfViewRadians = degToRad(60)

  let gui = new GUI()

  let cube = new Polygon(gl, programInfo, gui)

  requestAnimationFrame(drawScene)

  // Draw the scene.
  function drawScene(time) {
    time = time * 0.0005

    twgl.resizeCanvasToDisplaySize(gl.canvas)

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)

    // Compute the projection matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000)

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 0, 100]
    var target = [0, 0, 0]
    var up = [0, 1, 0]
    var cameraMatrix = m4.lookAt(cameraPosition, target, up)

    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix)

    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

    var coneXRotation = time
    var coneYRotation = -time

    gl.useProgram(programInfo.program)

    cube.draw(time, viewProjectionMatrix)

    requestAnimationFrame(drawScene)
  }
}

main()
