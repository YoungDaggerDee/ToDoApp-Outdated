class Task {
  constructor(text, id, color) {
    this.text = text
    this.id = id
    this.color = color
    this.favorite = false
  }
  remove() {
    return this.id
  }
  favoriteToggel() {
    this.favorite = !this.favorite
  }
}