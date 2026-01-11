import Store from "electron-store";

class urlStore {
  constructor() {
    this.store = new Store();
  }
  getUrl() {
    if (!this.store.has("url")) {
      this.store.set("url", "http://localhost:1145/");
    }
    return this.store.get("url");
  }
  setUrl(url) {
    this.store.set("url", url);
  }
}
export default new urlStore();
