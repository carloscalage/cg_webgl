class GUI {
  constructor() {
    this.folders = []
    this.gui = new dat.GUI()
  }

  get_folder(name) {
    return this.folders.find(elem => elem.name === name)
  }

  new_category(name) {
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

  add_element(obj, property_name, values) {
    values
      ? this.gui.add(obj, property_name, values[0], values[1], property_name[2])
      : this.gui.add(obj, property_name)
  }

  add_element_to_category(category, obj, property_name, values) {
    let folder = this.get_folder(category).elem

    values
      ? folder.add(obj, property_name, values[0], values[1], property_name[2])
      : folder.add(obj, property_name)

    return folder
  }
}
