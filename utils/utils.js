const degToRad = d => (d * Math.PI) / 180

const radToDeg = r => (r * 180) / Math.PI

const computeMatrix = (viewProjectionMatrix, rotate, translate, scale) => {
  let tlt = m4.translate(viewProjectionMatrix, translate[0], translate[1], translate[2])

  let rtx = m4.xRotate(tlt, rotate[0])
  let rty = m4.yRotate(rtx, rotate[1])
  let rtz = m4.zRotate(rty, rotate[2])

  let matrix = m4.scale(rtz, scale[0], scale[1], scale[2])

  return matrix
}
