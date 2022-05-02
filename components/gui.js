let config = {
  rotateX: degToRad(0),
  rotateY: degToRad(0),
  rotateZ: degToRad(0),
  translateX: degToRad(0),
  translateY: degToRad(0),
  translateZ: degToRad(0),
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1
}

const loadGUI = () => {
  const gui = new dat.GUI()
  for (let prop in config) {
    gui.add(config, prop, -20, 20, 0.3)
  }
}
