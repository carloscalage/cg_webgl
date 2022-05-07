class Cube {
  constructor(gl, programInfo, gui) {
    this.gl = gl
    this.programInfo = programInfo
    this.gui = gui

    this.cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20)
    this.cubeVAO = twgl.createVAOFromBufferInfo(gl, programInfo, this.cubeBufferInfo)

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

    this.cubeUniforms = {
      u_colorMult: [0.5, 1, 0.5, 1],
      u_matrix: m4.identity()
    }

    this.add_controller()
  }

  add_controller() {
    this.gui.add_category(Math.random() * 10, this.transformations)
  }

  draw(time, viewProjectionMatrix) {
    // Setup all the needed attributes.
    this.gl.bindVertexArray(this.cubeVAO)

    this.cubeUniforms.u_matrix = computeMatrix(viewProjectionMatrix, this.transformations)

    // Set the uniforms we just computed
    twgl.setUniforms(this.programInfo, this.cubeUniforms)

    twgl.drawBufferInfo(this.gl, this.cubeBufferInfo)
  }
}

class Sphere {
  constructor(gl, programInfo) {
    this.gl = gl
    this.programInfo = programInfo

    this.sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6)
    this.sphereVAO = twgl.createVAOFromBufferInfo(gl, programInfo, this.sphereBufferInfo)

    this.sphereUniforms = {
      u_colorMult: [0.5, 1, 0.5, 1],
      u_matrix: m4.identity()
    }

    this.sphereTranslation = [0, 0, 0]
  }

  draw(time, viewProjectionMatrix) {
    this.sphereXRotation = time
    this.sphereYRotation = time

    // Setup all the needed attributes.
    this.gl.bindVertexArray(this.sphereVAO)

    this.sphereUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      this.sphereTranslation,
      this.sphereXRotation,
      this.sphereYRotation
    )

    // Set the uniforms we just computed
    twgl.setUniforms(this.programInfo, this.sphereUniforms)

    twgl.drawBufferInfo(this.gl, this.sphereBufferInfo)
  }
}

class Cone {
  constructor(gl, programInfo) {
    this.gl = gl
    this.programInfo = programInfo

    this.coneBufferInfo = flattenedPrimitives.createTruncatedConeBufferInfo(
      gl,
      10,
      0,
      20,
      12,
      1,
      true,
      false
    )
    this.coneVAO = twgl.createVAOFromBufferInfo(gl, programInfo, this.coneBufferInfo)

    this.coneUniforms = {
      u_colorMult: [0.5, 0.5, 1, 1],
      u_matrix: m4.identity()
    }

    this.coneTranslation = [40, 0, 0]
  }

  draw(time, viewProjectionMatrix) {
    this.gl.bindVertexArray(this.coneVAO)

    this.coneUniforms.u_matrix = computeMatrix(
      viewProjectionMatrix,
      this.coneTranslation,
      this.coneXRotation,
      this.coneYRotation
    )

    twgl.setUniforms(this.programInfo, this.coneUniforms)

    twgl.drawBufferInfo(this.gl, this.coneBufferInfo)
  }
}
