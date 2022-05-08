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

    this.viewProjectionMatrix = 0

    this.add_controller()
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
  }

  compute(aspect) {
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
