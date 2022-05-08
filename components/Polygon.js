class Polygon {
  constructor(gl, programInfo, gui, id, remove_polygon) {
    this.gl = gl
    this.programInfo = programInfo
    this.bufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20)
    this.VAO = twgl.createVAOFromBufferInfo(gl, programInfo, this.bufferInfo)

    /* Gui Variables */

    this.gui = gui
    this.id = id

    this.remove_polygon = remove_polygon
    this.remove_button = {
      remove: () => {
        this.gui.remove_category(this.id)
        this.remove_polygon(this.id)
      }
    }

    /* Animation */

    // Toggle animation menu
    this.set_animation = false
    // Starts animation flow
    this.start_animation = false
    // Array of animations
    this.animations = []
    // Configuration obj
    this.animation_button = {
      animation_menu: () => {
        this.animation_handler()
      },
      toggle_animation: () => {
        this.t0 = Date.now()
        this.transformations[this.animations[0].name] = this.animations[0].from
        this.start_animation = !this.start_animation
      },
      rotationX: () => this.animations.push(this.enter_values('rotationX')),
      rotationY: () => this.animations.push(this.enter_values('rotationY')),
      rotationZ: () => this.animations.push(this.enter_values('rotationZ')),
      translationX: () => this.animations.push(this.enter_values('translationX')),
      translationY: () => this.animations.push(this.enter_values('translationY')),
      translationZ: () => this.animations.push(this.enter_values('translationZ')),
      scaleX: () => this.animations.push(this.enter_values('scaleX')),
      scaleY: () => this.animations.push(this.enter_values('scaleY')),
      scaleZ: () => this.animations.push(this.enter_values('scaleZ')),
      speed: 0.1
    }

    this.t0 = 0
    // 1000 ms divididos em 120 frames por segundo
    this.frame_duration = 1000 / 120
    this.lag = 0

    /* Config */

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

  enter_values(name) {
    let from = Number(prompt('From: (Number)'))
    let to = Number(prompt('To: (Number)'))
    return { name, from, to }
  }

  animation_handler() {
    this.set_animation = !this.set_animation

    if (this.set_animation) {
      this.gui.remove_category(this.id)
      this.gui.new_category(this.id)
      this.gui.add_element_to_category(this.id, this.animation_button, 'speed', [0, 0.5, 0.1])

      this.gui.add_element_to_category(this.id, this.animation_button, 'rotationX', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'rotationY', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'rotationZ', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'translationX', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'translationY', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'translationZ', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'scaleX', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'scaleY', false)
      this.gui.add_element_to_category(this.id, this.animation_button, 'scaleZ', false)

      this.gui.add_element_to_category(this.id, this.animation_button, 'toggle_animation', false)
      this.gui
        .add_element_to_category(this.id, this.animation_button, 'animation_menu', false)
        .open()
    }

    if (!this.set_animation) {
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

    this.gui.add_element_to_category(this.id, this.animation_button, 'animation_menu', false).open()
    this.gui.add_element_to_category(this.id, this.remove_button, 'remove', false)
  }

  draw(time, viewProjectionMatrix) {
    if (this.start_animation) {
      let current = Date.now()
      let elapsed = current - this.t0

      this.t0 = current
      this.lag += elapsed

      if (this.lag >= this.frame_duration) {
        if (this.animations.length) {
          if (this.transformations[this.animations[0].name] <= this.animations[0].to) {
            this.transformations[this.animations[0].name] += this.animation_button.speed
          } else {
            this.animations.shift()

            if (this.animations.length)
              this.transformations[this.animations[0].name] = this.animations[0].from
          }
        } else {
          alert('Animação chegou ao seu fim')
          this.start_animation = false
        }
      }
      this.lag -= this.frame_duration
    }

    this.gl.bindVertexArray(this.VAO)

    this.uniforms.u_matrix = computeMatrix(viewProjectionMatrix, this.transformations)

    twgl.setUniforms(this.programInfo, this.uniforms)

    twgl.drawBufferInfo(this.gl, this.bufferInfo)
  }
}
