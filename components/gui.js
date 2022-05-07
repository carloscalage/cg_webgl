class GUI {
  constructor() {
    this.folders = []
    this.gui = new dat.GUI()
  }

  get_folder(name) {
    return this.folders.find(elem => elem.name === name)
  }

  add_category(name, config) {
    let folder = this.gui.addFolder(name)
    this.folders.push({ name, elem: folder })

    for (let prop in config) {
      folder.add(config, prop, -20, 20, 0.3)
    }
  }

  remove_category(name) {
    let folder = this.get_folder(name)

    if (!folder) throw 'Categoria não encontrada'

    this.gui.removeFolder(folder.elem)
    this.folders.filter(elem => elem.name !== name)
  }

  add_button(folder_name, obj, property_name) {
    let folder = this.get_folder(folder_name)
    folder.elem.add(obj, property_name)
  }
}
