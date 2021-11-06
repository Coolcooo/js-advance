module.exports = class {
  constructor(iterable) {
    this.set = [];
    for (const element of iterable) {
      this.add(element);
    }
  }
  add(element) {
    if (!this.set.includes(element)) {
      this.set.push(element);
    }
    return this;
  }

  [Symbol.iterator]() {
    this.current = 0;
    return this;
  }
  next() {
    let result;
    if (this.current !== this.set.length) {
      result = {value: this.set[this.current], done: false};
      this.current += 1;
    } else {
      result = { done : true }
    }
    return result;
  }

  delete(element) {
    let deleteIndex;
    for (let i = 0; i < this.set.length; i += 1) {
      if (this.set[i] === element) {
        deleteIndex = i;
      }
    }
    if (deleteIndex) {
      this.set = this.set.splice(deleteIndex - 1, 1);
      return true;
    }
    return false;
  }
  clear() {
    this.set = [];
  }

  get size() {
    return this.set.length;
  }

  has(element) {
    return this.set.includes(element);
  }

  get [Symbol.toStringTag]() {
    return '^_^';
  }
  valueOf() {
    return this;
  }

  keys() {
    return this.set.values();
  }

  values() {
    return this.set.values();
  }

  entries() {
    const arr = [];
    for (const elem of this.set) {
      arr.push([elem, elem]);
    }
    return arr;
  }

}