class GUI {
  constructor() {
    this.folders = []
    this.gui = new dat.GUI()
  }

  add_category(name, config) {
    let folder = this.gui.addFolder(name)
    this.folders.push({ name, elem: folder })

    for (let prop in config) {
      folder.add(config, prop, -20, 20, 0.3)
    }
  }

  remove_category(name) {
    let folder = this.folders.find(elem => elem.name === name)

    if (!folder) throw 'Categoria não encontrada'

    this.gui.removeFolder(folder.elem)
    this.folders.filter(elem => elem.name !== name)
  }
}
