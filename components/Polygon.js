class Polygon {
  constructor(gl, programInfo, gui) {
    this.gl = gl
    this.programInfo = programInfo
    this.gui = gui
    this.id = Math.random() * 10
    this.animate = false

    this.bufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20)
    this.VAO = twgl.createVAOFromBufferInfo(gl, programInfo, this.bufferInfo)

    this.transformations = {
      rotationX: degToRad(0),
      rotationY: degToRad(0),
      rotationZ: degToRad(0),
      translationX: degToRad(0),
      translationY: degToRad(0),
      translationZ: degToRad(0),
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    }

    this.uniforms = {
      u_colorMult: [0.5, 1, 0.5, 1],
      u_matrix: m4.identity()
    }

    this.add_controller()
  }

  add_controller() {
    this.gui.add_category(this.id, this.transformations)
  }

  reset_transformation() {
    this.transformations = {
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      translationX: 0,
      translationY: 0,
      translationZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    }
  }

  draw(time, viewProjectionMatrix) {
    // Setup all the needed attributes.
    this.gl.bindVertexArray(this.VAO)

    this.uniforms.u_matrix = computeMatrix(viewProjectionMatrix, this.transformations)

    // Set the uniforms we just computed
    twgl.setUniforms(this.programInfo, this.uniforms)

    twgl.drawBufferInfo(this.gl, this.bufferInfo)
  }
}
