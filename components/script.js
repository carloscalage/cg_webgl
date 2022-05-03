function main() {
  const { gl, meshProgramInfo } = initializeWorld()

  //Cube

  const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20)

  const cubeVAO = twgl.createVAOFromBufferInfo(gl, meshProgramInfo, cubeBufferInfo)

  const cubeUniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: m4.identity()
  }

  var fieldOfViewRadians = degToRad(60)

  let gui = new GUI()
  gui.add_category('Cubo', config)

  function render() {
    twgl.resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)

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

    gl.useProgram(meshProgramInfo.program)

    // ------ Draw the cube --------

    // Setup all the needed attributes.
    gl.bindVertexArray(cubeVAO)

    rotateConfig = [config.rotateX, config.rotateY, config.rotateZ]
    translateConfig = [config.translateX, config.translateY, config.translateZ]
    scaleConfig = [config.scaleX, config.scaleY, config.scaleZ]

    cubeUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      rotateConfig,
      translateConfig,
      scaleConfig
    )

    // Set the uniforms we just computed
    twgl.setUniforms(meshProgramInfo, cubeUniforms)

    twgl.drawBufferInfo(gl, cubeBufferInfo)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
