const degToRad = d => (d * Math.PI) / 180

const radToDeg = r => (r * 180) / Math.PI

const computeMatrix = (viewProjectionMatrix, transformations) => {
  let tlt = m4.translate(
    viewProjectionMatrix,
    transformations.translationX,
    transformations.translationY,
    transformations.translationZ
  )

  let rtx = m4.xRotate(tlt, transformations.rotationX)
  let rty = m4.yRotate(rtx, transformations.rotationY)
  let rtz = m4.zRotate(rty, transformations.rotationZ)

  let matrix = m4.scale(rtz, transformations.scaleX, transformations.scaleY, transformations.scaleZ)

  return matrix
}
