class MySet {
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

  forEach(fn, thisArg = fn) {
    for (let i = 0; i < this.set.length; i += 1) {
      fn.call(thisArg, this.set[i], this.set[i], this);
    }
  }


}

const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
  console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
  console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
  getValue () { return this.value }
}

const data = {
  value: 42
}

// есть метод add
set.add(object);
set.add(data);

// который может работать в цепочке вызовов
set.add(object).add(object).add(object);
console.log([...set])
console.log('obj', set.has(object));
// есть метод delete
set.delete(data);
console.log([...set])
// есть метод has
console.log(set.has({})); // false
console.log('obj',set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object ^_^]
console.log(Object.prototype.toString.call(set)) // [object ^_^]
set.forEach(function (item) {
  console.log(item.getValue.call(this)); // 42
}, data)
