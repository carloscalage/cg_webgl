class GUI {
  constructor(initial_config) {
    this.folders = []
    this.gui = new dat.GUI()
  }

  add_category(name, obj) {
    let folder = this.gui.addFolder(name)
    this.folders.push({ name, elem: folder })

    for (let prop in obj) {
      folder.add(obj, prop, -20, 20, 0.3)
    }
  }

  remove_category(name) {
    let folder = this.folders.find(elem => elem.name === name)

    if (!folder) throw 'Categoria não encontrada'

    this.gui.removeFolder(folder.elem)
    this.folders.filter(elem => elem.name !== name)
  }
}

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
