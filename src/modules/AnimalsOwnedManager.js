import APIManager from "./APIManager"

class AnimalsOwnedManager extends APIManager {
  getAnimalsOwned(id) {
    return this.get(id)
  }
  getAll() {
    return this.all()
  }
  removeAndList(id) {
    return this.delete(id).then(() => this.all())
  }
}

export default new AnimalsOwnedManager("animalsOwned")