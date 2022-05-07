class Polygon {
  constructor(gl, programInfo, gui) {
    this.gl = gl
    this.programInfo = programInfo

    //Gui Variables
    this.gui = gui
    this.id = Math.random() * 10
    this.animate = false
    this.animation_button = {
      animate: () => {
        this.animation_handler()
      }
    }
    this.animation_config = {
      speed: 1.2
    }

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

  animation_handler() {
    this.animate = !this.animate

    if (this.animate) {
      this.gui.remove_category(this.id)
      this.gui.add_category(this.id)
      this.gui.add_element(this.id, this.animation_config)
      this.gui.add_button(this.id, this.animation_button, 'animate').open()
    }

    if (!this.animate) {
      this.gui.remove_category(this.id)
      this.gui.add_category(this.id)
      this.gui.add_element(this.id, this.transformations)
      this.gui.add_button(this.id, this.animation_button, 'animate').open()
    }
  }

  add_controller() {
    this.gui.add_category(this.id)
    this.gui.add_element(this.id, this.transformations)

    this.gui.add_button(this.id, this.animation_button, 'animate')
  }

  draw(time, viewProjectionMatrix) {
    if (this.animate) {
      this.transformations = {
        ...this.transformations,
        rotationX: time * this.animation_config.speed
      }
    }

    // Setup all the needed attributes.
    this.gl.bindVertexArray(this.VAO)

    this.uniforms.u_matrix = computeMatrix(viewProjectionMatrix, this.transformations)

    // Set the uniforms we just computed
    twgl.setUniforms(this.programInfo, this.uniforms)

    twgl.drawBufferInfo(this.gl, this.bufferInfo)
  }
}
