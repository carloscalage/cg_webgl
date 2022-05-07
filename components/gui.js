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
    console.log(this.get_folder(name))

    let folder = this.get_folder(name).elem

    for (let prop in config) {
      folder.add(config, prop, -20, 20, 0.1).onChange(elem => console.log(elem))
    }

    return folder
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
