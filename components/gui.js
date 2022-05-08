class GUI {
  constructor() {
    this.folders = []
    this.gui = new dat.GUI()
  }

  get_folder(name) {
    return this.folders.find(elem => elem.name === name)
  }

  add_category(name) {
    let folder = this.gui.addFolder(name)
    this.folders.push({ name, elem: folder })

    return folder
  }

  remove_category(name) {
    let folder = this.get_folder(name)

    if (!folder) throw 'Categoria não encontrada'

    this.gui.removeFolder(folder.elem)
    this.folders = this.folders.filter(elem => elem.name !== name)
  }

  add_element(name, config) {
    let folder = this.get_folder(name).elem

    for (let prop in config) {
      folder.add(config, prop, -200, 200, 0.1)
    }

    return folder
  }

  custom_element(name, config, property_name, values) {
    let folder = this.get_folder(name).elem
    folder.add(config, property_name, values[0], values[1], property_name[2])
  }

  add_button(folder_name, obj, property_name) {
    if (folder_name) {
      let folder = this.get_folder(folder_name).elem
      folder.add(obj, property_name)
      return folder
    } else {
      this.gui.add(obj, property_name)
    }
  }
}
