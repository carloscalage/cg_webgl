class Camera {
  constructor(gui) {
    this.gui = gui

    this.transformations = {
      position_x: 0,
      position_y: 0,
      position_z: 100,
      lookat_x: 0,
      lookat_y: 0,
      lookat_z: 0,
      zoom: degToRad(60)
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
      position_x: () => this.animations.push(this.enter_values('position_x')),
      position_y: () => this.animations.push(this.enter_values('position_y')),
      position_z: () => this.animations.push(this.enter_values('position_z')),
      lookat_x: () => this.animations.push(this.enter_values('lookat_x')),
      lookat_y: () => this.animations.push(this.enter_values('lookat_y')),
      lookat_z: () => this.animations.push(this.enter_values('lookat_z')),
      zoom: () => this.animations.push(this.enter_values('zoom')),
      speed: 0.1
    }

    this.t0 = 0
    // 1000 ms divididos em 120 frames por segundo
    this.frame_duration = 1000 / 120
    this.lag = 0

    this.viewProjectionMatrix = 0

    this.add_controller()
  }

  animation_handler() {
    this.set_animation = !this.set_animation

    if (this.set_animation) {
      this.gui.remove_category('Camera')
      this.gui.new_category('Camera')

      this.gui.add_element_to_category('Camera', this.animation_button, 'speed', [0.1, 0.5, 0.1])

      this.gui.add_element_to_category('Camera', this.animation_button, 'position_x', false)
      this.gui.add_element_to_category('Camera', this.animation_button, 'position_y', false)
      this.gui.add_element_to_category('Camera', this.animation_button, 'position_z', false)
      this.gui.add_element_to_category('Camera', this.animation_button, 'lookat_x', false)
      this.gui.add_element_to_category('Camera', this.animation_button, 'lookat_y', false)
      this.gui.add_element_to_category('Camera', this.animation_button, 'lookat_z', false)
      this.gui.add_element_to_category('Camera', this.animation_button, 'zoom', false)

      this.gui.add_element_to_category('Camera', this.animation_button, 'toggle_animation', false)
      this.gui
        .add_element_to_category('Camera', this.animation_button, 'animation_menu', false)
        .open()
    }

    if (!this.set_animation) {
      this.gui.remove_category(this.id)

      this.add_controller()
    }
  }

  add_controller() {
    this.gui.new_category('Camera')

    this.gui.add_element_to_category('Camera', this.transformations, 'position_x', [-200, 200, 0.1])
    this.gui.add_element_to_category('Camera', this.transformations, 'position_y', [-200, 200, 0.1])
    this.gui.add_element_to_category('Camera', this.transformations, 'position_z', [-200, 200, 0.1])

    this.gui.add_element_to_category('Camera', this.transformations, 'lookat_x', [0, 200, 0.1])
    this.gui.add_element_to_category('Camera', this.transformations, 'lookat_y', [0, 200, 0.1])
    this.gui.add_element_to_category('Camera', this.transformations, 'lookat_z', [0, 200, 0.1])

    this.gui.add_element_to_category('Camera', this.transformations, 'zoom', [
      0,
      degToRad(180),
      0.01
    ])

    this.gui.add_element_to_category('Camera', this.animation_button, 'animation_menu', false)
  }

  enter_values(name) {
    let from = Number(prompt('From: (Number)'))
    let to = Number(prompt('To: (Number)'))
    return { name, from, to }
  }

  compute(aspect) {
    // if animation is true
    if (this.start_animation) {
      let current = Date.now()
      let elapsed = current - this.t0

      this.t0 = current
      this.lag += elapsed

      if (this.lag >= this.frame_duration) {
        // checks if there's any animation to do
        if (this.animations.length) {
          // checks if the animation is not complete yet
          if (this.transformations[this.animations[0].name] <= this.animations[0].to) {
            this.transformations[this.animations[0].name] += this.animation_button.speed
            // if completed, removes it from array and set another one to start
          } else {
            this.animations.shift()

            // checks if it hasn't done all the animations
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

    let projectionMatrix = m4.perspective(this.transformations.zoom, aspect, 1, 2000)

    let cameraPosition = [
      this.transformations.position_x,
      this.transformations.position_y,
      this.transformations.position_z
    ]
    let target = [
      this.transformations.lookat_x,
      this.transformations.lookat_y,
      this.transformations.lookat_z
    ]

    let up = [0, 1, 0]

    let cameraMatrix = m4.lookAt(cameraPosition, target, up)

    // Make a view matrix from the camera matrix.
    let viewMatrix = m4.inverse(cameraMatrix)

    this.viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)
  }
}
