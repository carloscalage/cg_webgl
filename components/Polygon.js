class Polygon {
  constructor(gl, programInfo, gui, id, remove_polygon) {
    this.gl = gl
    this.programInfo = programInfo
    this.bufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20)
    this.VAO = twgl.createVAOFromBufferInfo(gl, programInfo, this.bufferInfo)

    this.time_0 = 0

    //Gui Variables
    this.gui = gui
    this.id = id

    this.remove_polygon = remove_polygon
    this.remove_button = {
      remove: () => {
        this.gui.remove_category(this.id)
        this.remove_polygon(this.id)
      }
    }

    this.animate = false
    this.animation_button = {
      toggle_rotation: () => {
        this.animation_handler()
      }
    }
    this.animation_config = {
      speed: 0.1
    }

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
      this.gui.new_category(this.id)
      this.gui.add_element_to_category(this.id, this.animation_config, 'speed', [0, 0.05, 0.01])
      this.gui.add_element_to_category(this.id, this.animation_button, 'toggle_rotation', false)
    }

    if (!this.animate) {
      this.gui.remove_category(this.id)

      this.add_controller()
    }
  }

  add_controller() {
    this.gui.new_category(this.id)

    this.gui.add_element_to_category(this.id, this.transformations, 'rotationX', [0, 10, 0.1])
    this.gui.add_element_to_category(this.id, this.transformations, 'rotationY', [0, 10, 0.1])
    this.gui.add_element_to_category(this.id, this.transformations, 'rotationZ', [0, 10, 0.1])

    this.gui.add_element_to_category(
      this.id,
      this.transformations,
      'translationX',
      [-100, 100, 0.1]
    )
    this.gui.add_element_to_category(
      this.id,
      this.transformations,
      'translationY',
      [-100, 100, 0.1]
    )
    this.gui.add_element_to_category(
      this.id,
      this.transformations,
      'translationZ',
      [-100, 100, 0.1]
    )

    this.gui.add_element_to_category(this.id, this.transformations, 'scaleX', [1, 10, 0.1])
    this.gui.add_element_to_category(this.id, this.transformations, 'scaleY', [1, 10, 0.1])
    this.gui.add_element_to_category(this.id, this.transformations, 'scaleZ', [1, 10, 0.1])

    this.gui.add_element_to_category(this.id, this.animation_button, 'toggle_rotation', false)
    this.gui.add_element_to_category(this.id, this.remove_button, 'remove', false)
  }

  draw(time, viewProjectionMatrix) {
    this.gl.bindVertexArray(this.VAO)

    this.uniforms.u_matrix = computeMatrix(viewProjectionMatrix, this.transformations)

    twgl.setUniforms(this.programInfo, this.uniforms)

    twgl.drawBufferInfo(this.gl, this.bufferInfo)
  }
}
