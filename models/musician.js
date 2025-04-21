class Musician {

  constructor(store) {
    this.store = store;
  }
  
  initStore(data) {
    const newStore = Object.assign(this.store, data);
    this.store = newStore;
  };

  getStore() {
    return this.store;
  }
  
  printStore() {
    console.log(this.store);
  };

  isMusicianInStore(id) {
    const keys = Object.keys(this.store);
    return keys.includes(id);
  }

  getMusicians(id, callback) {
    return callback(null, this.store);
  }

  getMusician(id, callback) {
    if(this.isMusicianInStore(id)) {
      return callback(null, this.store[id]);
    }
    return callback('Musician does not exist');
  }

  putMusician(id, musician, callback) {
    if (id !== musician.firstName.toLowerCase()) {
      return callback("Musician id in request path and body do not match.");
    }
    const newStore = Object.assign({}, this.store);
    if(this.isMusicianInStore(id)) {
      const newMusician = Object.assign(this.store[id], musician);
      newStore[id] = newMusician;
    }else {
      newStore[id] = musician;
    }
    this.store = newStore;
    return callback(null, id);
  }

  deleteMusician(id, callback) {
    const newStore = Object.assign({}, this.store);
    delete newStore[id];
    this.store = newStore;
    return callback(null, id);
  }
  
}

module.exports = Musician;
